export async function GET() {
  const base = 'https://cryptohome-beta.vercel.app';
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/curso', priority: '0.9', changefreq: 'monthly' },
    { url: '/macroeconomia', priority: '0.8', changefreq: 'monthly' },
    { url: '/analisis-tecnico', priority: '0.8', changefreq: 'monthly' },
    { url: '/analisis-fundamental', priority: '0.8', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${base}${p.url}</loc>
    <priority>${p.priority}</priority>
    <changefreq>${p.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=86400',
    }
  });
}
