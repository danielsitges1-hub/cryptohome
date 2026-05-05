import { STRIPE_SECRET_KEY, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
  const sessionId = url.searchParams.get('session_id');

  if (sessionId) {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      },
    });

    const session = await res.json();

    if (session.payment_status === 'paid') {
      const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
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

    const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
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
