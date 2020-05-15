const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.LOCATIONIQ_API_KEY;

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
      address
    )}&format=json`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("could not get coordinates for provided address", 422);
  }

  const coordinates = {
    lat: data[0].lat,
    lng: data[0].lon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
