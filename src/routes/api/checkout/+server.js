import { STRIPE_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ request, url }) {
  const { email } = await request.json();

  const params = new URLSearchParams();
  params.append('customer_email', email);
  params.append('payment_method_types[]', 'card');
  params.append('line_items[0][price_data][currency]', 'usd');
  params.append('line_items[0][price_data][product_data][name]', 'Curso Completo — Crypto Network');
  params.append('line_items[0][price_data][unit_amount]', '6000');
  params.append('line_items[0][quantity]', '1');
  params.append('mode', 'payment');
  params.append('success_url', `${url.origin}/acceso?session_id={CHECKOUT_SESSION_ID}`);
  params.append('cancel_url', `${url.origin}/curso`);

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const session = await res.json();

  if (!res.ok) {
    console.error('Stripe error:', JSON.stringify(session));
    return json({ error: session.error?.message ?? 'Error al crear sesión de pago' }, { status: 500 });
  }

  return json({ url: session.url });
}
