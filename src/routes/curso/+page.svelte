<script>
  let email = '';
  let cargando = false;
  let error = '';

  async function comprar() {
    if (!email) { error = 'Ingresa tu email para continuar.'; return; }
    cargando = true;
    error = '';
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const { url } = await res.json();
    window.location.href = url;
  }
</script>

<svelte:head>
  <title>Curso de Trading — Crypto Network</title>
</svelte:head>

<section class="max-w-4xl mx-auto px-4 py-16">
  <!-- Hero -->
  <div class="text-center mb-16">
    <h1 class="text-5xl font-bold mb-4">
      Curso Completo de <span class="text-yellow-400">Trading</span>
    </h1>
    <p class="text-xl text-gray-400 max-w-2xl mx-auto">
      Aprende a invertir en crypto y bolsa desde cero. Método probado, sin promesas falsas.
    </p>
  </div>

  <!-- Lo que incluye -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
    {#each [
      { icon: '🎬', texto: '20+ videos de trading en profundidad' },
      { icon: '📊', texto: 'Análisis técnico y fundamental completo' },
      { icon: '🌍', texto: 'Macroeconomía aplicada al mercado' },
      { icon: '💹', texto: 'Demo en TradingView y Bybit' },
      { icon: '🧠', texto: 'Mindset y gestión de riesgo' },
      { icon: '♾️', texto: 'Acceso de por vida con tu email' },
    ] as item}
      <div class="flex items-center gap-3 bg-gray-800 rounded-xl p-4">
        <span class="text-2xl">{item.icon}</span>
        <span class="text-gray-300">{item.texto}</span>
      </div>
    {/each}
  </div>

  <!-- CTA de compra -->
  <div class="bg-gray-800 rounded-2xl p-8 max-w-md mx-auto text-center">
    <p class="text-gray-400 text-sm mb-1">Pago único — acceso de por vida</p>
    <p class="text-5xl font-bold text-yellow-400 mb-6">$60 USD</p>

    <input
      type="email"
      bind:value={email}
      placeholder="tu@email.com"
      class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-yellow-400"
    />

    <button
      onclick={comprar}
      disabled={cargando}
      class="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg text-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
    >
      {cargando ? 'Redirigiendo a pago...' : '🔒 Comprar el curso — $60'}
    </button>

    {#if error}
      <p class="text-red-400 text-sm mt-3">{error}</p>
    {/if}

    <p class="text-gray-600 text-xs mt-4">
      Tu email es tu llave de acceso. Pago seguro con Stripe.
    </p>
  </div>

  <!-- Ya compraste -->
  <p class="text-center text-gray-500 mt-8 text-sm">
    ¿Ya tienes acceso? <a href="/acceso" class="text-yellow-400 hover:underline">Entra aquí</a>
  </p>
</section>
