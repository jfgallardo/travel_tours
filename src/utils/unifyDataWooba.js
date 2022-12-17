export const woobaData = (flights, ofertasDesde) => {
  if (flights) {
    return flights.map(function (flight) {
      return {
        Origem: flight.Origem.CodigoIata,
        Destino: flight.Destino.CodigoIata,
        TempoTotal: flight.TempoDeDuracao,
        ValorTotalComTaxa: flight.Preco.Total,
        ValorTotalTaxas: flight.Preco.Taxa,
        ValorTotal: flight.Preco.TotalGeral,
        Preco: flight.Preco,
        VoosIda: voosIda(flight.Voos),
        VoosVolta: voosVolta(flight.Voos),
        Key: flight.IdentificacaoDaViagem,
        NumeroParadas: flight.NumeroParadas,
        OfertasDesde: ofertasDesde,
        CiaMandatoria: flight.CiaMandatoria,
      };
    });
  }
  return null;
};

export const woobaDataMultiple = (flights, ofertasDesde) => {
  if (flights) {
    return flights.map(function (flight) {
      return {
        Origem: flight.Origem.CodigoIata,
        Destino: flight.Destino.CodigoIata,
        TempoTotal: flight.TempoDeDuracao,
        Preco: flight.Preco,
        ValorTotalComTaxa: flight.Preco.Total,
        ValorTotalTaxas: flight.Preco.Taxa,
        ValorTotal: flight.Preco.TotalGeral,
        Voos: flight.Voos,
        Key: flight.IdentificacaoDaViagem,
        NumeroParadas: flight.NumeroParadas,
        OfertasDesde: ofertasDesde,
        CiaMandatoria: flight.CiaMandatoria,
      };
    });
  }
  return null;
};

function voosIda(params) {
  return params.filter((voo) => {
    if (voo.Segmento === 'I') {
      return voo;
    }
  });
}

function voosVolta(params) {
  return params.filter((voo) => {
    if (voo.Segmento === 'V') {
      return voo;
    }
  });
}
