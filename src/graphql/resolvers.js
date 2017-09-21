const Campground = require('../models/Campground');

module.exports = {
  Query: {
    getCampgrounds(obj, args, context, info) {
      return Campground.getList(args);
    },

    getCampgroundDetail(obj, args, context, info) { 
      return Campground.getDetail(args);
    }
  }
};