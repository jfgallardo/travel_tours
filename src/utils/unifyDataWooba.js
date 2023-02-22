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
        AirportsIata: airportsByFlight(flight),
        Baggage: isFlightWithBaggage(flight),
        Cabine: typeCabine(flight),
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
      if (o.VoosVolta.length > 0)
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
  let originalArraySort = originalArray.sort(function (a, b) {
    return a.offers > b.offers ? -1 : a.offers < b.offers ? 1 : 0;
  });

  for (let i in originalArraySort) {
    lookupObject[originalArraySort[i][prop]] = originalArraySort[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

function airportsByFlight(flight) {
  const vI = voosIda(flight.Voos);
  const vV = voosVolta(flight.Voos);
  let flights = [];
  vI.forEach((item) => {
    if (!flights.includes(item.Destino.CodigoIata))
      flights.push(item.Destino.CodigoIata);
    if (!flights.includes(item.Origem.CodigoIata))
      flights.push(item.Origem.CodigoIata);
  });
  vV.forEach((item) => {
    if (!flights.includes(item.Destino.CodigoIata))
      flights.push(item.Destino.CodigoIata);
    if (!flights.includes(item.Origem.CodigoIata))
      flights.push(item.Origem.CodigoIata);
  });
  return flights;
}

function isFlightWithBaggage(flight) {
  flight.Voos.forEach((o) => {
    if (o.BagagemInclusa) return true;
  });
  return false;
}

function typeCabine(flight) {
  const vI = voosIda(flight.Voos);
  const vV = voosVolta(flight.Voos);
  let cabin = [];

  vI.forEach((item) => {
    if (!cabin.includes(item.Cabine)) cabin.push(item.Cabine);
    if (!cabin.includes(item.Cabine)) cabin.push(item.Cabine);
  });
  vV.forEach((item) => {
    if (!cabin.includes(item.Cabine)) cabin.push(item.Cabine);
    if (!cabin.includes(item.Cabine)) cabin.push(item.Cabine);
  });

  return cabin;
}
