import { createContext, ReactNode, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast"

import { api } from "../services/api";

import { currency } from "../utils/masks";
import { simulador } from "../utils/simulador";
import { LinhasCredito } from "../database/LinhasCredito";


type SimuladorContextType = {
  isLoading: boolean;
  linhaCredito?: number | null;
  valor?: string;
  simulacao?: Array<SimulacaoProps> | [];
  gravaValor: (valor: string) => void;
  selectLinhaCredito: (id:number) => void;
  executaSimulacao: () => void;
  resetSimulacao: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

type SimulacaoProps = {
  linhaCredito: {
    nmeLinha: string,
    taxaJuros: Object,
    prazoMaximo: number
  },
  totalParcelas: number,
  valorParcela: number,
  valorSolicitado: string,
  valorTotal: number,
  valorTaxaJuros: number,
  valorTotalJuros: number
}

export const SimuladorContext = createContext( {} as SimuladorContextType);

export function SimuladorProvider({ children }: AuthProviderProps) {
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [linhaCredito, setLinhaCredito] = useState<number>(0);
  const [valor, setValor] = useState<string>("");
  const [simulacao, setSimulacao] = useState<Array<SimulacaoProps>>([]);
  const toast = useToast();

  async function selectLinhaCredito(id:number) {
    setLinhaCredito(id);
  }

  async function gravaValor(valor:string) {
    valor = currency(valor);
    setValor(valor);
  }

  async function resetSimulacao() {
    console.log("resetou")
    setValor("");
    setLinhaCredito(0);
  }
  
  async function executaSimulacao () {
    if (linhaCredito <= 0) {
      toast({ title: "Escolha uma linha de crédito", status: "error", position: "top", isClosable: true });
      return false;
    }

    if (valor && valor?.length <= 6){
      setSimulacao([]);
      return false;
    }

    if (valor === '') {
      toast({ title: "Informe o valor desejado", status: "error", position: "top", isClosable: true });
      setSimulacao([]);
      return false;
    }

    setIsLoading(true);
    
    const valorSimulacao = parseFloat(valor.replace(/\./g, "").replace(',', '.'));
    if (isNaN(valorSimulacao)) return false;

    const taxaJuros = LinhasCredito[linhaCredito].taxaJuros;
    const prazoMaximo = LinhasCredito[linhaCredito].prazoMaximo;

    let totalParcelas = 12;
    const dadosSimulacao: Array<SimulacaoProps> = []
    while ( totalParcelas <= prazoMaximo) {
      let juros = taxaJuros[totalParcelas];
      if(juros) {

        const response = await api.post("/emprestimo/simulador-emprestimo", {vlr_solicitado : valorSimulacao, vlr_taxa_juros: juros, nmr_max_parcela: totalParcelas});

        if(response.status !== 200) {
          toast({ title: "Erro desconhecido, tente novamente", status: "error", position: "top", isClosable: true });
        }else{
          const simulacao = response.data.simulacao[0]; 
          dadosSimulacao.push({
            linhaCredito: LinhasCredito[linhaCredito],
            totalParcelas,
            valorSolicitado: valor,
            valorParcela: simulacao.vlr_parcela,
            valorTotal: simulacao.vlr_devedor,
            valorTaxaJuros: simulacao.vlr_taxa_juros,
            valorTotalJuros: simulacao.vlr_juros,
          })
        }
        /*
        let s = new simulador(valorSimulacao, juros, totalParcelas);
        dadosSimulacao.push({
          linhaCredito: LinhasCredito[linhaCredito],
          totalParcelas,
          valorSolicitado: valor,
          valorParcela: s.financiarPrice(),
          valorTotal: s.calculaTotalPagoPrice(),
          valorTaxaJuros: juros,
          valorTotalJuros: s.calculaTotalJurosPrice(),
        })
        */
      }
      
      totalParcelas += 12
    }
    console.log(dadosSimulacao)
    setSimulacao(dadosSimulacao);  
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <SimuladorContext.Provider value={{ isLoading, valor, linhaCredito, simulacao, gravaValor, executaSimulacao, selectLinhaCredito, resetSimulacao}}>
      {children}
    </SimuladorContext.Provider>
  );  
}