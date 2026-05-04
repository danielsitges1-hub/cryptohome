import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  httpClient: Stripe.createNodeHttpClient(),
});

export async function POST({ request, url }) {
  const { email } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Curso Completo — Crypto Network',
            description: 'Acceso de por vida al curso completo de trading e inversiones.',
          },
          unit_amount: 6000, // $60.00 en centavos
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${url.origin}/acceso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${url.origin}/curso`,
  });

  return json({ url: session.url });
}
