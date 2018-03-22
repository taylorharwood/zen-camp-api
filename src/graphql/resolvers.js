const CampgroundAPI = require('../models/CampgroundAPI');

module.exports = {
  Query: {
    getCampgrounds(obj, args, context, info) {
      return CampgroundAPI.getList(args);
    },

    getCampgroundDetail(obj, args, context, info) {
      return CampgroundAPI.getDetail(args);
    }
  }
};