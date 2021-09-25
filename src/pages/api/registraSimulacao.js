import { api } from "../../services/api";

export default async function handler( req, res) {
  const {nome, cpf, celular, email, simulacao} = req.body;

  if(!nome || !cpf || !celular || !email || !simulacao){
    res.status(500).send();
    return false;
  }
  
  const response = await api.post("/neoassist/register-only", {nome, cpf, celular, email, simulacao});

  if(response.status !== 200) {
    res.status(500).end();
  }else{
    res.status(200).json(response.data);
  }
  
}