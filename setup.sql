-- Execute no SQL Editor do Supabase (Settings → SQL Editor)
create table if not exists public.acoes (
  id              text primary key default gen_random_uuid()::text,
  produto_id      text not null,
  gerente_id      text not null,
  titulo          text not null,
  descricao       text default '',
  executor_id     text default null,
  fase            text default 'planejamento',
  prioridade      text default 'media',
  complexidade    text default 'media',
  mes_inicio      integer not null,
  mes_fim         integer not null,
  horas_estimadas integer default 0,
  percentual      integer default 0,
  status          text default 'planejado',
  aprovacao_coord text default 'pendente',
  aprovacao_dir   text default 'pendente',
  aprovacao_sec   text default 'pendente',
  criado_em       timestamptz default now(),
  atualizado_em   timestamptz default now()
);
alter table public.acoes enable row level security;
create policy "acesso_total" on public.acoes for all using (true) with check (true);
