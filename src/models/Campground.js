const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Campground = sequelize.define('campground', {
    facilityName: Sequelize.STRING,
    facilityID: Sequelize.STRING
  });

  Campground.associate = models => {
    Campground.belongsToMany(models.User, {through: 'UserCampground'});
  };

  return Campground;
}

