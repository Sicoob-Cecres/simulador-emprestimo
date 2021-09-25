const querystring = require('querystring');
const { curly } = require('node-libcurl')

export default async function handler( req, res) {
  const {
    query: { id, name },
    method,
  } = req

  if(method === 'POST') {
    const {nome, cpf, celular, email, simulacao} = req.body;

    if(!nome || !cpf || !celular || !email || !simulacao){
      res.status(500).send();
      return false;
    }

    const html = `
    Olá <strong>${nome}</strong>, para darmos continuidade na sua solicitação nos envie os <strong>2 últimos holerites</strong><br />
    <br />
    <strong> Dados da simulação</strong><br />
      <strong> CPF:</strong> ${cpf}<br />
      <strong> Celular:</strong> ${celular}<br />
      <strong> Email:</strong> ${email}<br />
      <br />
    - Linha de Crédito: ${simulacao.linhaCredito.nmeLinha}<br />
    - Valor Solicitado: ${simulacao.valorSolicitado}<br />
    - Valor Parcela: ${simulacao.valorParcela}<sup>*</sup><br />
    - Total de Parcelas: ${simulacao.totalParcelas}<sup>*</sup><br />
    *Crédito sujeito à aprovação cadastral e demais condições do produto. As condições podem variar de acordo com o perfil.`

    const jsonData = JSON.stringify(`{"CategoryID":"435462","Data":{"Name":"${nome}","EMail":"${email}","FieldU":"${cpf.replace(/[^\d]/g, "")}"},"ExpertID":"229866","Origin":"1","Observacao":"${html}","ResponderChamado":"on","IncluirHistorico":"on","AguardandoComplemento":"on","ClassificacaoCRM":""}`)
    const { data } = await curly.post('https://sicoobcecresa.neoassist.com/API/ExternalServices/ProtocoloService/RegisterOnly.json?AppKey=16259192f636b712c45139eb90e77c8d&AppInstanceKey=65eeb17f71c26dd39ae89ca9e59bc870&ExpertID=229880', {
      postFields: `{"jsonData": ${jsonData.replace(/\\n/g," ")},"token":"1"}`,
      httpHeader: [
        'Content-Type: application/json',
        'Accept: application/json'
      ],
    })

    res.status(200).json(data);
    return true;
  }
  res.status(404).send();
}

