import Stripe from 'stripe';
import { env } from '$env/dynamic/private';
import { env as pubEnv } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

export async function POST({ request }) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return new Response('Webhook error', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;

    const supabase = createClient(pubEnv.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { realtime: { transport: ws } });
    await supabase.from('purchases').upsert({ email, stripe_session_id: session.id });
  }

  return new Response('ok');
}
