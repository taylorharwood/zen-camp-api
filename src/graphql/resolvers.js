const { CampgroundAPI, User } = require('../models');

module.exports = {
  Query: {
    getCampgrounds(obj, args, context, info) {
      return CampgroundAPI.getList(args);
    },

    getCampgroundDetail(obj, args, context, info) { 
      return CampgroundAPI.getDetail(args);
    }
  },

  Mutation: {
    createUser(obj, args, context, info) {
      return User.create({
        username: args.username,
        password: args.password
      });
    },

    // todo:
    loginUser(obj, args, context, info) {
      return new Promise();
    }
  }
};