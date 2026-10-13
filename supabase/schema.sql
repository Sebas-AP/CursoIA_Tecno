-- ============================================================
-- Esquema de base de datos: Módulo de Equipos y Proyectos
-- Ejecutar en Supabase: SQL Editor > New query > pegar y Run
-- ============================================================

-- Tabla de configuración (PIN del instructor)
create table if not exists public.settings (
  key text primary key,
  value text not null
);

-- PIN inicial del instructor (cambiar después desde el SQL Editor)
insert into public.settings (key, value)
values ('instructor_pin', 'ia-tecno-2026')
on conflict (key) do nothing;

-- Tabla de equipos con sus datos de proyecto (relación 1:1)
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  members jsonb not null default '[]'::jsonb,
  code text not null unique,
  project_name text,
  description text,
  repo_url text,
  demo_url text,
  status text not null default 'sin_entregar'
    check (status in ('sin_entregar', 'en_desarrollo', 'publicado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Row Level Security: lectura pública, escritura solo por RPC
-- ------------------------------------------------------------
alter table public.settings enable row level security;
alter table public.teams enable row level security;

-- Cualquiera puede leer los equipos/proyectos
create policy "teams_select_public" on public.teams
  for select using (true);

-- Nadie escribe directo en settings desde el navegador
create policy "settings_no_access" on public.settings
  for all using (false);

-- ------------------------------------------------------------
-- Funciones RPC (security definer): validan PIN o código de equipo
-- ------------------------------------------------------------

-- 1) Validar PIN del instructor
create or replace function public.verify_instructor_pin(pin text)
returns boolean
language plpgsql security definer set search_path = public
as $$
declare
  real_pin text;
begin
  select value into real_pin from settings where key = 'instructor_pin';
  return pin is not null and pin = real_pin;
end;
$$;

-- 2) Crear equipos (solo instructor). Recibe un jsonb: [{"name": "...", "members": ["..."]}]
create or replace function public.create_teams(pin text, new_teams jsonb)
returns setof public.teams
language plpgsql security definer set search_path = public
as $$
begin
  if not public.verify_instructor_pin(pin) then
    raise exception 'PIN de instructor incorrecto';
  end if;

  return query
  insert into public.teams (name, members, code)
  select
    t ->> 'name',
    coalesce(t -> 'members', '[]'::jsonb),
    upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6))
  from jsonb_array_elements(new_teams) as t
  returning *;
end;
$$;

-- 3) Eliminar un equipo/proyecto (solo instructor)
create or replace function public.delete_team(pin text, team_id uuid)
returns boolean
language plpgsql security definer set search_path = public
as $$
begin
  if not public.verify_instructor_pin(pin) then
    raise exception 'PIN de instructor incorrecto';
  end if;

  delete from public.teams where id = team_id;
  return found;
end;
$$;

-- 4) Consultar equipo por código (para que el equipo identifique su registro)
create or replace function public.get_team_by_code(team_code text)
returns table(id uuid, name text, members jsonb)
language plpgsql security definer set search_path = public
as $$
begin
  return query
  select t.id, t.name, t.members
  from public.teams t
  where upper(t.code) = upper(trim(team_code));
end;
$$;

-- 5) Registrar/actualizar proyecto con código de equipo (estudiantes)
create or replace function public.submit_project(
  team_code text,
  p_project_name text,
  p_description text,
  p_repo_url text,
  p_demo_url text,
  p_status text
)
returns setof public.teams
language plpgsql security definer set search_path = public
as $$
begin
  return query
  update public.teams t
  set
    project_name = nullif(trim(p_project_name), ''),
    description  = nullif(trim(p_description), ''),
    repo_url     = nullif(trim(p_repo_url), ''),
    demo_url     = nullif(trim(p_demo_url), ''),
    status       = case
                     when p_status in ('en_desarrollo', 'publicado') then p_status
                     else t.status
                   end,
    updated_at   = now()
  where upper(t.code) = upper(trim(team_code))
  returning t.*;
end;
$$;

-- 6) Editar cualquier campo de un equipo (solo instructor)
create or replace function public.instructor_update_team(pin text, team_id uuid, patch jsonb)
returns setof public.teams
language plpgsql security definer set search_path = public
as $$
begin
  if not public.verify_instructor_pin(pin) then
    raise exception 'PIN de instructor incorrecto';
  end if;

  return query
  update public.teams t
  set
    name         = coalesce(patch ->> 'name', t.name),
    members      = coalesce(patch -> 'members', t.members),
    project_name = coalesce(patch ->> 'project_name', t.project_name),
    description  = coalesce(patch ->> 'description', t.description),
    repo_url     = coalesce(patch ->> 'repo_url', t.repo_url),
    demo_url     = coalesce(patch ->> 'demo_url', t.demo_url),
    status       = coalesce(patch ->> 'status', t.status),
    updated_at   = now()
  where t.id = team_id
  returning t.*;
end;
$$;
