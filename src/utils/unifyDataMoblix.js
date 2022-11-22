const unifyDataMoblix = (flights) => {
  const cleanData = flights.map(function (flight) {
    return {
      Origem: flight.Origem,
      Destino: flight.Destino,
      Saida: flight.Saida,
      Chegada: flight.Chegada,
      TempoTotal: flight.TempoTotalStr,
      FlightCode: flight.FlightCode,
      VooDirecto: flight.Voos.length === 1 ? true : false,
      ValorTotalComTaxa: flight.ValorTotalComTaxa,
      ValorTotalTaxas: flight.ValorTotalTaxas,
      ValorTotal: flight.ValorTotal,
    };
  });

  return cleanData;
};

export default unifyDataMoblix;
