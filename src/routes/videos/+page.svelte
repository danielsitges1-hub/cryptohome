<script>
  export let data;

  const modulos = [
    {
      titulo: '1. Bienvenida',
      videos: [
        { titulo: 'Video de Bienvenida', youtubeId: 'Ch588LyIcLY' }
      ]
    },
    {
      titulo: '2. Introducción',
      videos: [
        { titulo: 'Bienvenida', youtubeId: '' },
        { titulo: 'Canales de Información', youtubeId: '' },
        { titulo: 'Afiliados', youtubeId: '' },
        { titulo: 'Registro de Trades (Excel)', youtubeId: '' },
        { titulo: 'Mindset', youtubeId: '' },
        { titulo: 'Fundamentos de la Inversión', youtubeId: '' },
        { titulo: '¿Por qué invertir en Cryptos?', youtubeId: '' },
      ]
    },
    {
      titulo: '3. Broker y Aplicación',
      videos: [
        { titulo: 'Bybit', youtubeId: '' },
        { titulo: 'TradingView', youtubeId: '' },
      ]
    },
    {
      titulo: '4. Temario',
      videos: [
        { titulo: 'Capitalización Alta vs Baja', youtubeId: '' },
      ]
    },
    {
      titulo: '5. Gráficos y Análisis Técnico',
      videos: [
        { titulo: 'Demo TradingView', youtubeId: '' },
        { titulo: 'Demo Bybit', youtubeId: '' },
        { titulo: 'Cierre de Módulo', youtubeId: '' },
      ]
    },
    {
      titulo: '6. Indicadores',
      videos: [
        { titulo: 'Temporalidades', youtubeId: '' },
        { titulo: 'ADX', youtubeId: '' },
        { titulo: 'RSI', youtubeId: '' },
        { titulo: 'Volumen', youtubeId: '' },
        { titulo: 'EMA', youtubeId: '' },
        { titulo: 'Patrones', youtubeId: '' },
        { titulo: 'Tendencias', youtubeId: '' },
        { titulo: 'Day Trade & Swing Trade', youtubeId: '' },
        { titulo: 'Velas Japonesas', youtubeId: '' },
      ]
    },
    {
      titulo: '7. Conclusión',
      videos: [
        { titulo: 'Cierre del Curso', youtubeId: '' },
      ]
    }
  ];

  let videoActivo = modulos[0].videos[0];

  function seleccionar(video) {
    if (video.youtubeId) videoActivo = video;
  }
</script>

<svelte:head>
  <title>Curso Completo — Crypto Network</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-2xl font-bold">📚 Curso Completo — Crypto Network</h1>
    <p class="text-gray-400 text-sm">Acceso: <span class="text-yellow-400">{data.email}</span></p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Video player -->
    <div class="lg:col-span-2">
      {#if videoActivo.youtubeId}
        <div class="relative w-full rounded-xl overflow-hidden shadow-2xl" style="padding-top: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/{videoActivo.youtubeId}"
            title={videoActivo.titulo}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <h2 class="text-xl font-bold mt-4">{videoActivo.titulo}</h2>
      {:else}
        <div class="bg-gray-800 rounded-xl flex items-center justify-center" style="aspect-ratio: 16/9;">
          <p class="text-gray-500">Video próximamente disponible</p>
        </div>
      {/if}
    </div>

    <!-- Lista de módulos -->
    <div class="space-y-4 max-h-screen overflow-y-auto pr-2">
      {#each modulos as modulo}
        <div>
          <h3 class="text-sm font-bold text-yellow-400 mb-2">{modulo.titulo}</h3>
          <div class="space-y-1">
            {#each modulo.videos as video}
              <button
                onclick={() => seleccionar(video)}
                class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors
                  {videoActivo === video ? 'bg-yellow-400 text-black font-semibold' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                  {!video.youtubeId ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}"
                disabled={!video.youtubeId}
              >
                {video.titulo}
                {#if !video.youtubeId}
                  <span class="text-xs ml-1">(próximamente)</span>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
