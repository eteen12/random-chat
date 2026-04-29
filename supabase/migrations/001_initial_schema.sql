-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "vector";      -- pgvector for embeddings
create extension if not exists "pg_trgm";     -- trigram index for keyword search

-- ============================================================
-- ENUMS
-- ============================================================

create type plan_type as enum ('free', 'plus', 'pro');
create type chat_mode as enum ('sfw', 'adult');
create type message_role as enum ('user', 'character', 'system');
create type character_visibility as enum ('private', 'unlisted', 'public');
create type safety_action as enum ('blocked', 'warned', 'logged');

-- ============================================================
-- USERS
-- Extended profile on top of auth.users (Supabase Auth handles the auth row)
-- ============================================================

create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  dob           date,
  plan          plan_type not null default 'free',
  stripe_customer_id   text unique,
  age_verified_at      timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Auto-sync email from auth.users on insert
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- PERSONAS
-- ============================================================

create table public.personas (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.users(id) on delete cascade,
  name            text not null,
  description_md  text not null default '',
  avatar_url      text,
  is_default      boolean not null default false,
  created_at      timestamptz not null default now()
);

create index personas_user_id_idx on public.personas(user_id);

-- Ensure only one default persona per user
create unique index personas_user_default_idx on public.personas(user_id) where is_default = true;

-- ============================================================
-- CHARACTERS
-- ============================================================

create table public.characters (
  id                  uuid primary key default uuid_generate_v4(),
  owner_user_id       uuid not null references public.users(id) on delete cascade,
  name                text not null,
  description_md      text not null default '',
  system_prompt_md    text not null default '',
  greeting_md         text not null default '',
  example_dialog_md   text not null default '',
  avatar_url          text,
  visibility          character_visibility not null default 'private',
  nsfw                boolean not null default false,
  tags                text[] not null default '{}',
  import_source       jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index characters_owner_idx on public.characters(owner_user_id, created_at desc);
create index characters_public_idx on public.characters(visibility, created_at desc) where visibility = 'public';
create index characters_tags_idx on public.characters using gin(tags);

-- ============================================================
-- LOREBOOKS
-- ============================================================

create table public.lorebooks (
  id              uuid primary key default uuid_generate_v4(),
  owner_user_id   uuid not null references public.users(id) on delete cascade,
  name            text not null,
  created_at      timestamptz not null default now()
);

create index lorebooks_owner_idx on public.lorebooks(owner_user_id);

create table public.lorebook_entries (
  id              uuid primary key default uuid_generate_v4(),
  lorebook_id     uuid not null references public.lorebooks(id) on delete cascade,
  keywords        text[] not null default '{}',
  content_md      text not null,
  priority        integer not null default 100,
  always_on       boolean not null default false,
  created_at      timestamptz not null default now()
);

create index lorebook_entries_lorebook_idx on public.lorebook_entries(lorebook_id, priority);
create index lorebook_entries_keywords_idx on public.lorebook_entries using gin(keywords);

-- Many-to-many: characters <-> lorebooks
create table public.character_lorebooks (
  character_id    uuid not null references public.characters(id) on delete cascade,
  lorebook_id     uuid not null references public.lorebooks(id) on delete cascade,
  primary key (character_id, lorebook_id)
);

-- ============================================================
-- CHATS
-- ============================================================

create table public.chats (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references public.users(id) on delete cascade,
  persona_id      uuid references public.personas(id) on delete set null,
  title           text not null default 'New Chat',
  mode            chat_mode not null default 'sfw',
  model_slug      text not null default 'deepseek/deepseek-chat',
  created_at      timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create index chats_user_idx on public.chats(user_id, last_message_at desc);

-- Characters in a chat (supports group chats)
create table public.chat_characters (
  chat_id         uuid not null references public.chats(id) on delete cascade,
  character_id    uuid not null references public.characters(id) on delete cascade,
  position        integer not null default 0,
  primary key (chat_id, character_id)
);

create index chat_characters_chat_idx on public.chat_characters(chat_id, position);

-- ============================================================
-- MESSAGES
-- ============================================================

create table public.messages (
  id                    uuid primary key default uuid_generate_v4(),
  chat_id               uuid not null references public.chats(id) on delete cascade,
  role                  message_role not null,
  character_id          uuid references public.characters(id) on delete set null,
  content_md            text not null,
  model_slug            text,
  token_count           integer,
  created_at            timestamptz not null default now(),
  edited_at             timestamptz,
  regenerated_from_id   uuid references public.messages(id) on delete set null,
  -- 1536-dim vector from text-embedding-3-small
  -- DECISION: OpenAI text-embedding-3-small (1536d) over BAAI/bge for ease of
  -- deployment on Vercel (no self-hosted inference needed at v1 scale)
  embedding             vector(1536)
);

create index messages_chat_idx on public.messages(chat_id, created_at desc);
create index messages_embedding_idx on public.messages
  using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ============================================================
-- PINNED MEMORIES
-- ============================================================

create table public.pinned_memories (
  id          uuid primary key default uuid_generate_v4(),
  chat_id     uuid not null references public.chats(id) on delete cascade,
  content     text not null,
  created_at  timestamptz not null default now()
);

create index pinned_memories_chat_idx on public.pinned_memories(chat_id, created_at);

-- ============================================================
-- EXTRACTED FACTS
-- ============================================================

create table public.extracted_facts (
  id                  uuid primary key default uuid_generate_v4(),
  chat_id             uuid not null references public.chats(id) on delete cascade,
  character_id        uuid references public.characters(id) on delete set null,
  fact                text not null,
  source_message_id   uuid references public.messages(id) on delete set null,
  embedding           vector(1536),
  embedding_updated_at timestamptz,
  created_at          timestamptz not null default now()
);

create index extracted_facts_chat_idx on public.extracted_facts(chat_id, created_at desc);
create index extracted_facts_embedding_idx on public.extracted_facts
  using ivfflat (embedding vector_cosine_ops) with (lists = 50);

-- ============================================================
-- USAGE TRACKING
-- ============================================================

create table public.usage_daily (
  user_id         uuid not null references public.users(id) on delete cascade,
  date            date not null,
  message_count   integer not null default 0,
  model_breakdown jsonb not null default '{}',
  primary key (user_id, date)
);

-- ============================================================
-- SAFETY EVENTS
-- ============================================================

create table public.safety_events (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.users(id) on delete cascade,
  chat_id     uuid not null references public.chats(id) on delete cascade,
  message_id  uuid references public.messages(id) on delete set null,
  category    text not null,
  action      safety_action not null,
  created_at  timestamptz not null default now()
);

create index safety_events_user_idx on public.safety_events(user_id, created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.users            enable row level security;
alter table public.personas         enable row level security;
alter table public.characters       enable row level security;
alter table public.lorebooks        enable row level security;
alter table public.lorebook_entries enable row level security;
alter table public.character_lorebooks enable row level security;
alter table public.chats            enable row level security;
alter table public.chat_characters  enable row level security;
alter table public.messages         enable row level security;
alter table public.pinned_memories  enable row level security;
alter table public.extracted_facts  enable row level security;
alter table public.usage_daily      enable row level security;
alter table public.safety_events    enable row level security;

-- Users: own row only
create policy "users_self" on public.users
  for all using (auth.uid() = id);

-- Personas: own rows only
create policy "personas_owner" on public.personas
  for all using (auth.uid() = user_id);

-- Characters: owner full access; public characters readable by all authed
create policy "characters_owner" on public.characters
  for all using (auth.uid() = owner_user_id);
create policy "characters_public_read" on public.characters
  for select using (visibility = 'public');

-- Lorebooks: owner only
create policy "lorebooks_owner" on public.lorebooks
  for all using (auth.uid() = owner_user_id);
create policy "lorebook_entries_owner" on public.lorebook_entries
  for all using (
    lorebook_id in (select id from public.lorebooks where owner_user_id = auth.uid())
  );
create policy "character_lorebooks_owner" on public.character_lorebooks
  for all using (
    character_id in (select id from public.characters where owner_user_id = auth.uid())
  );

-- Chats: own chats only
create policy "chats_owner" on public.chats
  for all using (auth.uid() = user_id);
create policy "chat_characters_owner" on public.chat_characters
  for all using (
    chat_id in (select id from public.chats where user_id = auth.uid())
  );

-- Messages: own chat messages only
create policy "messages_owner" on public.messages
  for all using (
    chat_id in (select id from public.chats where user_id = auth.uid())
  );

-- Memory tables: own chat only
create policy "pinned_memories_owner" on public.pinned_memories
  for all using (
    chat_id in (select id from public.chats where user_id = auth.uid())
  );
create policy "extracted_facts_owner" on public.extracted_facts
  for all using (
    chat_id in (select id from public.chats where user_id = auth.uid())
  );

-- Usage: own row only
create policy "usage_daily_owner" on public.usage_daily
  for all using (auth.uid() = user_id);

-- Safety events: own events only
create policy "safety_events_owner" on public.safety_events
  for select using (auth.uid() = user_id);

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Semantic search over messages in a chat
create or replace function match_messages(
  p_chat_id     uuid,
  p_embedding   vector(1536),
  p_match_count integer default 5,
  p_threshold   float   default 0.7
)
returns table (
  id          uuid,
  content_md  text,
  created_at  timestamptz,
  similarity  float
) language sql stable as $$
  select
    m.id,
    m.content_md,
    m.created_at,
    1 - (m.embedding <=> p_embedding) as similarity
  from public.messages m
  where
    m.chat_id = p_chat_id
    and m.embedding is not null
    and 1 - (m.embedding <=> p_embedding) >= p_threshold
  order by m.embedding <=> p_embedding
  limit p_match_count;
$$;

-- Semantic search over extracted facts in a chat
create or replace function match_facts(
  p_chat_id     uuid,
  p_embedding   vector(1536),
  p_match_count integer default 10,
  p_threshold   float   default 0.6
)
returns table (
  id          uuid,
  fact        text,
  created_at  timestamptz,
  similarity  float
) language sql stable as $$
  select
    f.id,
    f.fact,
    f.created_at,
    1 - (f.embedding <=> p_embedding) as similarity
  from public.extracted_facts f
  where
    f.chat_id = p_chat_id
    and f.embedding is not null
    and 1 - (f.embedding <=> p_embedding) >= p_threshold
  order by f.embedding <=> p_embedding
  limit p_match_count;
$$;

-- Bump last_message_at on chats when a message is inserted
create or replace function public.update_chat_last_message()
returns trigger language plpgsql as $$
begin
  update public.chats set last_message_at = new.created_at where id = new.chat_id;
  return new;
end;
$$;

create trigger messages_bump_chat
  after insert on public.messages
  for each row execute procedure public.update_chat_last_message();
