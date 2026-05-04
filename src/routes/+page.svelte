<script>
  import PriceWidget from '$lib/components/PriceWidget.svelte';
</script>

<svelte:head>
  <title>Crypto Network — Educación Financiera</title>
</svelte:head>

<section class="max-w-6xl mx-auto px-4 py-16">
  <div class="text-center mb-12">
    <h1 class="text-5xl font-bold mb-4">
      Aprende a <span class="text-yellow-400">invertir</span> con conocimiento
    </h1>
    <p class="text-xl text-gray-400 max-w-2xl mx-auto">
      Educación financiera sobre mercados, criptomonedas y análisis.
      Sin humo. Sin promesas falsas. Solo conocimiento real.
    </p>
  </div>

  <div class="mb-16">
    <PriceWidget />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <a href="/macroeconomia" class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors group">
      <div class="text-3xl mb-3">🌍</div>
      <h2 class="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Macroeconomía</h2>
      <p class="text-gray-400 text-sm">Entiende cómo la economía global afecta los mercados financieros y las criptomonedas.</p>
    </a>
    <a href="/analisis-tecnico" class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors group">
      <div class="text-3xl mb-3">📊</div>
      <h2 class="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Análisis Técnico</h2>
      <p class="text-gray-400 text-sm">Lee gráficas como un profesional. Patrones, indicadores y estrategias de entrada y salida.</p>
    </a>
    <a href="/analisis-fundamental" class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors group">
      <div class="text-3xl mb-3">🔍</div>
      <h2 class="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">Análisis Fundamental</h2>
      <p class="text-gray-400 text-sm">Evalúa el valor real de un activo. ¿Qué lo hace subir o bajar a largo plazo?</p>
    </a>
  </div>
</section>
