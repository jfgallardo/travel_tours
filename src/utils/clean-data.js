export const transform = (segments, type, origin, destination) => {

  let ida = [];
  let vuelta = [];

  if (type === 'ida') {
    segments.forEach((item) => {
      if (item.departure === origin) ida.push(item)
    })
  }

  if (type === 'vuelta') {
    segments.forEach((item) => {
      if (item.departure === destination) vuelta.push(item)
    })
  }

if (type === 'ida') {
  return ida.map(item => {
    return {
      Platform: 1,
      Origem: item.departure,
      Destino: item.arrival,
      RateToken: item.rateToken,
      TokenConsultaMBX: item.TokenConsultaMBX,
      TempoTotal: item.duration,
      Preco: item.fareGroup?.priceWithTax,
      VoosIda: [],
      VoosVolta: [],
      Voos: item.legs,
      Key: item.tokenUnique,
      Id: item.TokenConsultaMBX,
      NumeroParadas: item.numberOfStops,
      OfertasDesde: [],
      CiaMandatoria: item.validatingBy.name,
      Baggage: item.fareProfile.baggage,
      FareGroup: item.fareGroup,
      ConfiguracoesRotas: item.ConfiguracoesRotas
    }
  })
}

if (type === 'vuelta') {
  return vuelta.map(item => {
    return {
      Platform: 1,
      Origem: item.departure,
      Destino: item.arrival,
      RateToken: item.rateToken,
      TokenConsultaMBX: item.TokenConsultaMBX,
      TempoTotal: item.duration,
      Preco: item.fareGroup?.priceWithTax,
      VoosIda: [],
      VoosVolta: [],
      Voos: item.legs,
      Key: item.tokenUnique,
      Id: item.TokenConsultaMBX,
      NumeroParadas: item.numberOfStops,
      OfertasDesde: [],
      CiaMandatoria: item.validatingBy.name,
      Baggage: item.fareProfile.baggage,
      FareGroup: item.fareGroup,
      ConfiguracoesRotas: item.ConfiguracoesRotas
    }
  })
}

return [];
}