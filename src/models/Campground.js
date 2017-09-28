const axios = require('axios');
const parseString = require('xml2js').parseString;

function constructGetListUrl(options) {
  const latitude = `landmarkLat=${options.latitude}`,
        longitude = `&landmarkLong=${options.longitude}`,
        siteType = options.siteType ? `&siteType=${options.siteType}` : '',
        amenity = options.amenity ? `&amenity=${options.amenity}` : '',
        maxpeople = options.maxpeople ? `&Maxpeople=${options.maxpeople}` : '',
        waterfront = options.waterfront ? `&waterfront=3011` : '';

  return `landmarkName=true&${latitude}${longitude}${siteType}${amenity}${maxpeople}${waterfront}&xml=true&expwith=1&expfits=1&api_key=${process.env.ACTIVE_CAMPGROUND_API_KEY}`;
}

function constructGetDetailsUrl(options) {
  return `contractCode=${options.contractID}&parkId=${options.parkId}&api_key=${process.env.ACTIVE_CAMPGROUND_API_KEY}`;
}

function parseList(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err || !result.resultset || !Array.isArray(result.resultset.result)) {
        reject('There was an error parsing the campground data');

        return false;
      }

      resolve(result.resultset.result.map(item => item['$']));
    });
  });
}

function parseDetail(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err || !result.detailDescription || !result.detailDescription['$']) {
        reject('There was an error parsing the campground data');
        
        return false;
      }

      resolve(result.detailDescription['$']);
    });
  });
}

module.exports = class Campground {
  static getList(options) {
    return axios.get(`${process.env.ACTIVE_CAMPGROUND_SEARCH_API_URL}?${constructGetListUrl(options)}`)
      .then(resp => parseList(resp.data))
      .catch(err => {
        console.log('error fetching campground list data:', err);
      });
  }

  static getDetail(options) {
    return axios.get(`${process.env.ACTIVE_CAMPGROUND_DETAILS_API_URL}?${constructGetDetailsUrl(options)}`)
      .then(resp => parseDetail(resp.data))
      .catch(err => {
        console.log('error fetching campground detail data:', err);
      });
  }
};