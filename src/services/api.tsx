import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.sicoobcecres.com.br/api/",
  headers: {
    'Content-Type': 'application/json'
  },
});
