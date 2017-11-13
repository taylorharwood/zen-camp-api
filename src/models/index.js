const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@db:5432/postgres');

let User, Campground, CampgroundAPI;

function init() {
  const userInit = require('./User');
  const campgroundInit = require('./Campground');

  User = userInit(sequelize);
  Campground = campgroundInit(sequelize);
  CampgroundAPI = require('./CampgroundAPI');

  // create tables if they do not yet exist.
  User.sync({ force: false });
  Campground.sync({ force: false });
}

init();

module.exports = {
  User: sequelize.models.user,
  Campground: sequelize.models.campground,
  CampgroundAPI: CampgroundAPI
};
