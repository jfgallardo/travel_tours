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
  return arregloOriginal.map((o) => {
    const item = o[0];
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
