const URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

export async function fetchPrices() {
  const response = await fetch(URL);
  if (!response.ok) throw new Error('Error al obtener precios');
  const data = await response.json();
  return {
    btc: data.bitcoin.usd,
    eth: data.ethereum.usd,
  };
}
