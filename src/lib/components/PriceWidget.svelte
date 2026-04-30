<script>
  import { onMount } from 'svelte';
  import { fetchPrices } from '$lib/api/coingecko.js';

  let btc = $state(null);
  let eth = $state(null);
  let loading = $state(true);
  let error = $state(null);

  async function update() {
    try {
      const prices = await fetchPrices();
      btc = prices.btc;
      eth = prices.eth;
      loading = false;
    } catch (e) {
      error = 'No se pudieron cargar los precios.';
      loading = false;
    }
  }

  onMount(() => {
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  });

  function formatPrice(price) {
    return price?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
</script>

<div class="bg-gray-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6 justify-center items-center">
  {#if loading}
    <p class="text-gray-400">Cargando precios...</p>
  {:else if error}
    <p class="text-red-400">{error}</p>
  {:else}
    <div class="text-center">
      <p class="text-gray-400 text-sm mb-1">BTC / USDT</p>
      <p class="text-3xl font-bold text-yellow-400">{formatPrice(btc)}</p>
    </div>
    <div class="hidden sm:block w-px h-12 bg-gray-600"></div>
    <div class="text-center">
      <p class="text-gray-400 text-sm mb-1">ETH / USDT</p>
      <p class="text-3xl font-bold text-blue-400">{formatPrice(eth)}</p>
    </div>
  {/if}
</div>
