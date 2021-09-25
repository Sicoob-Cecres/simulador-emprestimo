interface linhasCreditoProps {
  [linhaCredito: number]:{
      nmeLinha: string,
      taxaJuros: Object,
      prazoMaximo: number,
      documentos: Array<string>
   }
}

export const LinhasCredito: linhasCreditoProps = {
  4722: {
    nmeLinha: "Consignado",
    taxaJuros: {
      12: 1.15,
      24: 1.15,
      36: 1.35,
      48: 1.35,
      60: 1.55,
      72: 1.55,
      96: 1.75
    },
    prazoMaximo: 72,
    documentos: [
      '2 último holerites',
    ]
  },
  4732: {
    nmeLinha: "Crédito Pessoal",
    taxaJuros: {
      12: 1.77,
      24: 1.77,
      36: 1.83,
      48: 1.83,
      60: 1.96,
    },
    prazoMaximo: 60,
    documentos: [
      '2 último holerites',
    ]    
  },
  1234: {
    nmeLinha: "Empréstimo com garantia de imóvel",
    taxaJuros: {
      60: 1.12,
      120: 1.12,
      180: 1.12,
      240: 1.12,
    },
    prazoMaximo: 240,
    documentos: [
      '2 último holerites',
    ]
  },
  5678: {
    nmeLinha: "Financiamento de veículos",
    taxaJuros: {
      12: 0.99,
      24: 0.99,
      36: 0.99,
      48: 1.11,
      60: 1.11,
    },
    prazoMaximo: 60,
    documentos: [
      '2 último holerites',
      'Documento do carro'
    ]
  }
}