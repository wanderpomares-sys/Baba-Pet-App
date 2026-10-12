-- Babá Pet App: tabela de medição anônima de uso
-- Rode no Supabase: SQL Editor -> New query -> colar -> Run
create table if not exists public.events (
  id bigserial primary key,
  device text not null check (char_length(device) <= 64),
  event text not null check (char_length(event) <= 40),
  extra jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists events_created_idx on public.events (created_at);

alter table public.events enable row level security;

-- O app (chave pública "anon") só pode INSERIR. Ninguém consegue ler com ela.
drop policy if exists "app pode inserir" on public.events;
create policy "app pode inserir" on public.events
  for insert to anon
  with check (char_length(device) <= 64 and char_length(event) <= 40 and pg_column_size(extra) < 2000);

-- Sem policy de select/update/delete: só a service_role (painel local) lê.
