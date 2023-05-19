export const flightTransformation = (arregloOriginal, platform) => {
  const COMPANHIA_NOMES = {
    1: 'Latam',
    2: 'Gol',
    3: 'Azul',
    34: 'Livelo',
    11: 'Tap',
    1200: 'Interline',
    9000: 'Rextur',
    1300: 'Kayak',
  };
  const CLASSES_VOO = {
    0: 'Economica',
    1: 'PrimeiraClasse',
    2: 'Executiva',
  };

  if (!Array.isArray(arregloOriginal)) {
    return {
      Platform: platform,
      Origem: arregloOriginal.Origem,
      Destino: arregloOriginal.Destino,
      TempoTotal: arregloOriginal.TempoTotalStr,
      Preco: arregloOriginal.ValorTotal,
      VoosIda: [],
      VoosVolta: [],
      Voos: platform === 1 ? arregloOriginal.Voos : [],
      Key: arregloOriginal.Token,
      Id: arregloOriginal.FlightCode,
      NumeroParadas: platform === 1 ? arregloOriginal.Voos.length - 1 : 0,
      OfertasDesde: [],
      CiaMandatoria:
        platform === 1 ? COMPANHIA_NOMES[arregloOriginal.IdCia] : 0,
      AirportsIata: null,
      Baggage: arregloOriginal.BagagensInclusas,
      Cabine: platform === 1 ? CLASSES_VOO[arregloOriginal.Classe] : 0,
      ValorAdulto: platform === 1 ? arregloOriginal.ValorAdulto : '',
      ValorAdultoNaCia: platform === 1 ? arregloOriginal.ValorAdultoNaCia : '',
      ValorAdultoStr: platform === 1 ? arregloOriginal.ValorAdultoStr : '',
      ValorBebe: platform === 1 ? arregloOriginal.ValorBebe : '',
      ValorCrianca: platform === 1 ? arregloOriginal.ValorCrianca : '',
      ValorTotalComTaxa:
        platform === 1 ? arregloOriginal.ValorTotalComTaxa : '',
      ValorTotalTaxas: platform === 1 ? arregloOriginal.ValorTotalTaxas : '',
      ValorTxServico: platform === 1 ? arregloOriginal.ValorTxServico : '',
      Tarifas: platform === 1 ? arregloOriginal.Tarifas : [],
    };
  }

  return arregloOriginal.map((item) => {
    return {
      Platform: platform,
      Origem: item.Origem,
      Destino: item.Destino,
      TempoTotal: item.TempoTotalStr,
      Preco: item.ValorTotal,
      VoosIda: [],
      VoosVolta: [],
      Voos: platform === 1 ? item.Voos : [],
      Key: item.Token,
      Id: item.FlightCode,
      NumeroParadas: platform === 1 ? item.Voos.length - 1 : 0,
      OfertasDesde: [],
      CiaMandatoria: platform === 1 ? COMPANHIA_NOMES[item.IdCia] : 0,
      AirportsIata: airportsIata(platform, item),
      Baggage: item.BagagensInclusas,
      Cabine: platform === 1 ? CLASSES_VOO[item.Classe] : 0,
      ValorAdulto: platform === 1 ? item.ValorAdulto : '',
      ValorAdultoNaCia: platform === 1 ? item.ValorAdultoNaCia : '',
      ValorAdultoStr: platform === 1 ? item.ValorAdultoStr : '',
      ValorBebe: platform === 1 ? item.ValorBebe : '',
      ValorCrianca: platform === 1 ? item.ValorCrianca : '',
      ValorTotalComTaxa: platform === 1 ? item.ValorTotalComTaxa : '',
      ValorTotalTaxas: platform === 1 ? item.ValorTotalTaxas : '',
      ValorTxServico: platform === 1 ? item.ValorTxServico : '',
      Tarifas: platform === 1 ? item.Tarifas : [],
    };
  });
};

function airportsIata(platform, item) {
  let flights = [];
  if (platform === 1) {
    item.Voos.forEach((item) => {
      if (!flights.includes(item.Destino)) flights.push(item.Destino);
      if (!flights.includes(item.Origem)) flights.push(item.Origem);
    });
  }
  return flights;
}
