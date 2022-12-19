export const woobaData = (flights, ofertasDesde) => {
  if (flights) {
    return flights.map(function(flight) {
      return {
        Origem: flight.Origem.CodigoIata,
        Destino: flight.Destino.CodigoIata,
        TempoTotal: flight.TempoDeDuracao,
        Preco: flight.Preco,
        VoosIda: voosIda(flight.Voos),
        VoosVolta: voosVolta(flight.Voos),
        Key: flight.IdentificacaoDaViagem,
        Id: flight.Id,
        NumeroParadas: flight.NumeroParadas,
        OfertasDesde: ofertasDesde || null,
        CiaMandatoria: flight.CiaMandatoria
      };
    });
  }
  return null;
};

export const woobaDataRedis = (flight) => {
  if (flight) {
    return {
      Origem: flight.Origem.CodigoIata,
      Destino: flight.Destino.CodigoIata,
      TempoTotal: flight.TempoDeDuracao,
      Preco: flight.Preco,
      VoosIda: voosIda(flight.Voos),
      VoosVolta: voosVolta(flight.Voos),
      Key: flight.IdentificacaoDaViagem,
      Id: flight.Id,
      NumeroParadas: flight.NumeroParadas,
      CiaMandatoria: flight.CiaMandatoria
    };
  }
  return null
};

export const woobaDataMultiple = (flights, ofertasDesde) => {
  if (flights) {
    return flights.map(function(flight) {
      return {
        Origem: flight.Origem.CodigoIata,
        Destino: flight.Destino.CodigoIata,
        TempoTotal: flight.TempoDeDuracao,
        Preco: flight.Preco,
        Voos: flight.Voos,
        Id: flight.Id,
        Key: flight.IdentificacaoDaViagem,
        NumeroParadas: flight.NumeroParadas,
        OfertasDesde: ofertasDesde || null,
        CiaMandatoria: flight.CiaMandatoria
      };
    });
  }
  return null;
};

function voosIda(params) {
  return params.filter((voo) => {
    if (voo.Segmento === "I") {
      return voo;
    }
  });
}

function voosVolta(params) {
  return params.filter((voo) => {
    if (voo.Segmento === "V") {
      return voo;
    }
  });
}
