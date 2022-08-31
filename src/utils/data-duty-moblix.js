const dataDuty = (flights) => {

   const cleanData = flights.map(function (flight) {
    return {
        'Origem':flight.Origem,
        'Destino':flight.Destino,
        'Saida': flight.Saida,
        'Chegada': flight.Chegada,
        'TempoTotal': flight.TempoTotalStr,
        'FlightCode' : flight.FlightCode
    }    
   })

    
    
    
    
    
    
    
   return cleanData;
}


export default dataDuty;
