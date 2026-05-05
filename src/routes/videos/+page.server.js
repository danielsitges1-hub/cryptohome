import { env } from '$env/dynamic/private';
import { env as pubEnv } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import ws from 'ws';

export async function load({ url }) {
  const email = url.searchParams.get('email');

  if (!email) throw redirect(303, '/acceso');

  const supabase = createClient(pubEnv.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { realtime: { transport: ws } });
  const { data: compra } = await supabase
    .from('purchases')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();

  if (!compra) throw redirect(303, '/acceso');

  return { email };
}
