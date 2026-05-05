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
        { titulo: 'Bienvenida', youtubeId: 'scUE5tpU71M' },
        { titulo: 'Canales de Información', youtubeId: 'Fy-vmJvg98o' },
        { titulo: 'Afiliados', youtubeId: 'ejMgHRCdNb4' },
        { titulo: 'Registro de Trades (Excel)', youtubeId: '', descarga: '/registro-trades.csv' },
        { titulo: 'Mindset', youtubeId: 'P2M8dRLYQFo' },
        { titulo: 'Fundamentos de la Inversión', youtubeId: 'llbu4wipB1g' },
        { titulo: '¿Por qué invertir en Cryptos?', youtubeId: 'yskyqSYYUqQ' },
      ]
    },
    {
      titulo: '3. Broker y Aplicación',
      videos: [
        { titulo: 'Bybit', youtubeId: 'RMA3CHov7rE' },
        { titulo: 'TradingView', youtubeId: 'J5x-DuJEnFo' },
      ]
    },
    {
      titulo: '4. Temario',
      videos: [
        { titulo: 'Capitalización Alta vs Baja', youtubeId: 'noFLU9teuA8' },
      ]
    },
    {
      titulo: '5. Gráficos y Análisis Técnico',
      videos: [
        { titulo: 'Demo TradingView', youtubeId: 'tSbsE5gaztw' },
        { titulo: 'Demo Bybit', youtubeId: '27QkXlUNnP0' },
        { titulo: 'Cierre de Módulo', youtubeId: 'xIeKRwYBNFk' },
      ]
    },
    {
      titulo: '6. Indicadores',
      videos: [
        { titulo: 'Temporalidades', youtubeId: '962rMa-X_Ro' },
        { titulo: 'ADX', youtubeId: '6KjwBTn2Suo' },
        { titulo: 'RSI', youtubeId: 'GUl2KUgadNc' },
        { titulo: 'Volumen', youtubeId: 'CZRKAJqUR1I' },
        { titulo: 'EMA', youtubeId: '6WUg3Qx1dEs' },
        { titulo: 'Patrones', youtubeId: '4uahKCTka2c' },
        { titulo: 'Tendencias', youtubeId: 'a59l-i6k9no' },
        { titulo: 'Day Trade & Swing Trade', youtubeId: 'wFjz4lo6n6c' },
        { titulo: 'Velas Japonesas', youtubeId: 'DVS74fv9ADg' },
      ]
    },
    {
      titulo: '7. Conclusión',
      videos: [
        { titulo: 'Cierre del Curso', youtubeId: 'CY5tXT92vJg' },
      ]
    }
  ];

  let videoActivo = modulos[0].videos[0];

  function seleccionar(video) {
    if (video.youtubeId || video.descarga) videoActivo = video;
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
      {:else if videoActivo.descarga}
        <div class="bg-gray-800 rounded-xl flex flex-col items-center justify-center gap-4 p-10" style="aspect-ratio: 16/9;">
          <p class="text-white text-lg font-semibold text-center">📊 Registro de Trades</p>
          <p class="text-gray-400 text-sm text-center max-w-sm">Usa esta plantilla para registrar cada trade: fecha, ticket, tamaño de posición, dirección y resultado.</p>
          <a
            href={videoActivo.descarga}
            download
            class="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
          >
            ⬇️ Descargar Excel
          </a>
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
                  {!video.youtubeId && !video.descarga ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}"
                disabled={!video.youtubeId && !video.descarga}
              >
                {video.titulo}
                {#if video.descarga}
                  <span class="text-xs ml-1">📊</span>
                {:else if !video.youtubeId}
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
