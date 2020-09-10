import Geocodio from 'geocodio-library-node';

const config = {
  api_key: process.env.GEOCODIO_API,
}

const geo = new Geocodio(config.api_key);

/*
  Address manipulation methods
*/
const addressToLatLon = (address, result) => {
  geo.geocode(address)
    .then(resp => {
      if (resp.results.length >= 1) {
        result(null, resp.results[0].location);
      } else {
        result('Unable to geocode address.', null);
      }
    })
    .catch((err) => {
      result(err, null);
      console.log('error geocoding: ', err);
      return;
    });
};

exports.addressToLatLon = addressToLatLon;