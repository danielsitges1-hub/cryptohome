import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import ws from 'ws';

export async function load({ url }) {
  const email = url.searchParams.get('email');

  if (!email) throw redirect(303, '/acceso');

  const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { realtime: { transport: ws } });
  const { data: compra } = await supabase
    .from('purchases')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();

  if (!compra) throw redirect(303, '/acceso');

  return { email };
}
