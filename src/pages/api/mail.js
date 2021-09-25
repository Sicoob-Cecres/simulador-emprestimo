const nodemailer = require('nodemailer');

export default function handler( req, res) {
  let transporter = nodemailer.createTransport({
    host: process.env.NEXT_SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    tls: {
      ciphers:'SSLv3'
    },
    secureConnection: false,
    auth: {
      user: process.env.NEXT_SMTP_USER, // generated ethereal user
      pass: process.env.NEXT_SMTP_PASSWORD, // generated ethereal password
    },

  });

  const text = `
  Nome: ${req.body.nome}
  CPF: ${req.body.cpf}
  Celular: ${req.body.celular}
  Email: ${req.body.email}

  Dados da simulação
  - Linha de Crédito: ${req.body.simulacao.linhaCredito.nmeLinha}
  - Valor Juros: ${req.body.simulacao.valorTaxaJuros}
  - Valor Solicitado: ${req.body.simulacao.valorSolicitado}
  - Valor Parcela: ${req.body.simulacao.valorParcela}
  - Total de Parcelas: ${req.body.simulacao.totalParcelas}`

  const html = `
  <strong> Nome:</strong> ${req.body.nome}<br />
  <strong> CPF:</strong> ${req.body.cpf}<br />
  <strong> Celular:</strong> ${req.body.celular}<br />
  <strong> Email:</strong> ${req.body.email}<br />

  <strong> Dados da simulação</strong><br />
  - Linha de Crédito: ${req.body.simulacao.linhaCredito.nmeLinha}<br />
  - Valor Juros: ${req.body.simulacao.valorTaxaJuros}<br />
  - Valor Solicitado: ${req.body.simulacao.valorSolicitado}<br />
  - Valor Parcela: ${req.body.simulacao.valorParcela}<br />
  - Total de Parcelas: ${req.body.simulacao.totalParcelas}`

  transporter.sendMail({
    from: `"${req.body.nome}" < ${req.body.email}>`, 
    to: "faleconosco@sicoobcecres.com.br",
    replyTo: req.body.email, 
    subject: "Simulador de Empréstimo", 
    text,
    html,
  }).then(response => {
    res.status(200).json(response)  
  })
    .catch(error => {
      res.status(500).json(error)  
  });

}

