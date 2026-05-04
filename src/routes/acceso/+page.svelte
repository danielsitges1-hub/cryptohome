<script>
  import { enhance } from '$app/forms';
  export let data;
  export let form;
</script>

<svelte:head>
  <title>Acceso al Curso — Crypto Network</title>
</svelte:head>

<section class="max-w-md mx-auto px-4 py-24">
  <div class="bg-gray-800 rounded-2xl p-8 text-center">

    {#if data.recienPago}
      <div class="text-5xl mb-4">🎉</div>
      <h1 class="text-2xl font-bold mb-2">¡Pago exitoso!</h1>
      <p class="text-gray-400 mb-6">
        Tu acceso está activado para <span class="text-yellow-400 font-semibold">{data.email}</span>.
        Guarda bien este email — es tu llave de acceso.
      </p>
    {:else}
      <div class="text-5xl mb-4">🔑</div>
      <h1 class="text-2xl font-bold mb-2">Accede al Curso</h1>
      <p class="text-gray-400 mb-6">
        Ingresa el email con el que compraste el curso.
      </p>
    {/if}

    <form method="POST" action="?/verificar" use:enhance>
      <input
        type="email"
        name="email"
        value={data.email ?? ''}
        placeholder="tu@email.com"
        required
        class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-yellow-400"
      />
      <button
        type="submit"
        class="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors"
      >
        Ver mis videos
      </button>
    </form>

    {#if form?.error}
      <p class="text-red-400 text-sm mt-4">{form.error}</p>
    {/if}

    <p class="text-gray-600 text-xs mt-6">
      ¿Aún no tienes acceso? <a href="/curso" class="text-yellow-400 hover:underline">Compra el curso aquí</a>
    </p>
  </div>
</section>
