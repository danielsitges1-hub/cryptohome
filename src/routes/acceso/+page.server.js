import { env } from '$env/dynamic/private';
import { env as pubEnv } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import ws from 'ws';

export async function load({ url }) {
  const sessionId = url.searchParams.get('session_id');

  if (sessionId) {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      },
    });

    const session = await res.json();

    if (session.payment_status === 'paid') {
      const supabase = createClient(pubEnv.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { realtime: { transport: ws } });
      await supabase.from('purchases').upsert({
        email: session.customer_email,
        stripe_session_id: session.id
      });
      return { email: session.customer_email, recienPago: true };
    }
  }

  return { email: null, recienPago: false };
}

export const actions = {
  verificar: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email')?.toLowerCase().trim();

    const supabase = createClient(pubEnv.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { realtime: { transport: ws } });
    const { data: compra } = await supabase
      .from('purchases')
      .select('email')
      .eq('email', email)
      .single();

    if (compra) {
      throw redirect(303, `/videos?email=${encodeURIComponent(email)}`);
    }

    return { error: 'Este email no tiene acceso. ¿Ya compraste el curso?' };
  }
};
