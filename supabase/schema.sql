-- Table des demandes de devis
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  project_type text not null,
  budget text,
  deadline text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

-- Index utile pour un futur dashboard admin
create index if not exists quote_requests_status_idx on public.quote_requests (status);
create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);

-- Row Level Security reste activé ; l'application accède à PostgreSQL côté serveur via Prisma.
alter table public.quote_requests enable row level security;
