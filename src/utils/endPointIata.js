import { axiosAviationAPI } from "@/plugins/axios";

const endpoint = async (query) => {
  const endpointAuto = axiosAviationAPI.get(
    `autocomplete?key=b808a1-fd40a7&city=${query}`
  );
  const endpointIata = axiosAviationAPI.get(
    `airportDatabase?key=b808a1-fd40a7&codeIataAirport=${query}`
  );
  if (query.length >= 4) {
    return endpointAuto;
  } else {
    return Promise.all([endpointAuto, endpointIata]);
  }
};

export default endpoint;
