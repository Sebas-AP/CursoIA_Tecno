import { supabase, isSupabaseConfigured } from './supabaseClient';

const requireConfigured = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      'Supabase no está configurado. Crea el archivo .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.'
    );
  }
};

// Lectura pública de equipos y proyectos
export const fetchTeams = async () => {
  requireConfigured();
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
};

// Validar PIN de instructor
export const verifyInstructorPin = async (pin) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('verify_instructor_pin', { pin });
  if (error) throw error;
  return Boolean(data);
};

// Crear equipos (instructor). teams: [{ name, members: string[] }]
export const createTeams = async (pin, teams) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('create_teams', {
    pin,
    new_teams: teams,
  });
  if (error) throw error;
  return data || [];
};

// Eliminar equipo (instructor)
export const deleteTeam = async (pin, teamId) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('delete_team', {
    pin,
    team_id: teamId,
  });
  if (error) throw error;
  return Boolean(data);
};

// Buscar equipo por código (estudiantes)
export const getTeamByCode = async (code) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('get_team_by_code', {
    team_code: code,
  });
  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
};

// Registrar/actualizar proyecto (estudiantes, con código de equipo)
export const submitProject = async (code, project) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('submit_project', {
    team_code: code,
    p_project_name: project.projectName,
    p_description: project.description,
    p_repo_url: project.repoUrl,
    p_demo_url: project.demoUrl,
    p_status: project.status,
  });
  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
};

// Editar equipo/proyecto (instructor)
export const instructorUpdateTeam = async (pin, teamId, patch) => {
  requireConfigured();
  const { data, error } = await supabase.rpc('instructor_update_team', {
    pin,
    team_id: teamId,
    patch,
  });
  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
};
