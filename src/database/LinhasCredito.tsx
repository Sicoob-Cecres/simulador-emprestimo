interface linhasCreditoProps {
  [linhaCredito: number]:{
      nmeLinha: string,
      icon: string,
      taxaJuros: Object,
      prazoMaximo: number,
      documentos: Array<string>
   }
}

export const LinhasCredito: linhasCreditoProps = {
  4722: {
    nmeLinha: "Consignado",
    icon: "sicoob-icon-color-61 icon 12",
    taxaJuros: {
      12: 1.97,
      24: 1.97,
      36: 2.12,
      48: 2.12,
      60: 2.27,
    },
    prazoMaximo: 72,
    documentos: [
      '2 últimos holerites',
    ]
  },
  4732: {
    nmeLinha: "Crédito Pessoal",
    icon: "sicoob-icon-color-14 icon 12",
    taxaJuros: {
      12: 3.48,
      24: 3.63,
      36: 3.78,
      48: 3.78,
    },
    prazoMaximo: 60,
    documentos: [
      '2 últimos holerites',
    ]    
  },
  /*
  1234: {
    nmeLinha: "Empréstimo com garantia de imóvel",
    icon: "sicoob-icon-color-19 icon 12",
    taxaJuros: {
      60: 1.12,
      120: 1.12,
      180: 1.12,
      240: 1.12,
    },
    prazoMaximo: 240,
    documentos: [
      '2 últimos holerites',
    ]
  },
  */
  5678: {
    nmeLinha: "Financiamento de veículos",
    icon: "sicoob-icon-color-49 icon 12",
    taxaJuros: {
      12: 2.03,
      24: 2.03,
      36: 2.03,
      48: 2.18,
      60: 2.18,
    },
    prazoMaximo: 60,
    documentos: [
      '2 últimos holerites',
      'Documento do carro'
    ]
  }
}