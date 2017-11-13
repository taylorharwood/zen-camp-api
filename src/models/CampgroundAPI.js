const axios = require('axios');
const parseString = require('xml2js').parseString;

function constructGetListUrl(options) {
  const latitude = `landmarkLat=${options.latitude}`,
        longitude = `&landmarkLong=${options.longitude}`,
        siteType = options.siteType ? `&siteType=${options.siteType}` : '',
        amenity = options.amenity ? `&amenity=${options.amenity}` : '',
        maxpeople = options.maxPeople ? `&Maxpeople=${options.maxPeople}` : '',
        waterfront = options.waterfront ? `&waterfront=${options.waterfront}` : '';

  return `landmarkName=true&${latitude}${longitude}${siteType}${amenity}${maxpeople}${waterfront}&xml=true&expwith=1&expfits=1&api_key=${process.env.ACTIVE_CAMPGROUND_API_KEY}`;
}

function constructGetDetailsUrl(options) {
  return `contractCode=${options.contractID}&parkId=${options.parkId}&api_key=${process.env.ACTIVE_CAMPGROUND_API_KEY}`;
}

function parseList(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        console.error(err);
        reject('There was an error parsing the campground data');

        return false;
      }

      if (!result.resultset || !Array.isArray(result.resultset.result)) {
        resolve([]);

        return false;
      }

      // only return the first 50, otherwise the result set is too overwhelming
      resolve(result.resultset.result.slice(0, 50).map(item => item['$']));
    });
  });
}

function parseDetail(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err || !result.detailDescription || !result.detailDescription['$']) {
        console.error(err);
        reject('There was an error parsing the campground data');
        
        return false;
      }

      resolve(result.detailDescription['$']);
    });
  });
}

module.exports = class CampgroundAPI {
  static async getList(options) {
    let resp;

    try {
      resp = await axios.get(`${process.env.ACTIVE_CAMPGROUND_SEARCH_API_URL}?${constructGetListUrl(options)}`);
    } catch(e) {
      console.log('error fetching campground list data:', e); 
    }

    return parseList(resp.data);
  }

  static async getDetail(options) {
    let resp;

    try {
      resp = await axios.get(`${process.env.ACTIVE_CAMPGROUND_DETAILS_API_URL}?${constructGetDetailsUrl(options)}`);
    } catch(e) {
      console.log('error fetching campground detail data:', err); 
    }

    return parseDetail(resp.data);
  }
};