import moment from 'moment';

export const woobaData = (flights, ofertasDesde) => {
  if (flights) {
    return flights.map(function (flight) {
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
        OfertasDesde: removeDuplicates(ofertasDesde, 'company') || null,
        CiaMandatoria: flight.CiaMandatoria,
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
      CiaMandatoria: flight.CiaMandatoria,
    };
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
        Voos: flight.Voos,
        Id: flight.Id,
        Key: flight.IdentificacaoDaViagem,
        NumeroParadas: flight.NumeroParadas,
        OfertasDesde: removeDuplicates(ofertasDesde, 'company') || null,
        CiaMandatoria: flight.CiaMandatoria,
      };
    });
  }
  return null;
};

export const woobaTravelTime = (flightsA, flightsB) => {
  if (flightsB === null) {
    let arrayVoos = [];
    flightsA.map((o) => {
      arrayVoos.push(
        timeFlights(o.VoosIda[0], o.VoosIda[o.VoosIda.length - 1])
      );
      arrayVoos.push(
        timeFlights(o.VoosVolta[0], o.VoosVolta[o.VoosVolta.length - 1])
      );
    });
    return {
      lessTime: Math.min(...arrayVoos),
      longerTime: Math.max(...arrayVoos),
    };
  } else {
    return {
      lessTime: 0,
      longerTime: 0,
    };
  }
};

export const woobaPrice = (flightsA, flightsB) => {
  if (flightsB === null) {
    let arrayPrice = [];
    flightsA.map((o) => {
      arrayPrice.push(o.Preco.TotalGeral);
    });
    return {
      minPrice: Math.min(...arrayPrice),
      maxPrice: Math.max(...arrayPrice),
    };
  } else {
    return {
      minPrice: 0,
      maxPrice: 0,
    };
  }
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

function timeFlights(initial, end) {
  const x = moment(initial.DataSaida);
  const y = moment(end.DataChegada);
  return Math.trunc(moment.duration(y.diff(x)).as('hours'));
}

function removeDuplicates(originalArray, prop) {
  let newArray = [];
  let lookupObject = {};

  for (let i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
