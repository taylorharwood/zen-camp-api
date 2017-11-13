const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, unique: true },
    password: Sequelize.STRING
  });

  User.beforeCreate(async (user, options) => {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      
      return user;
    } catch(e) { console.error(e) };
  });

  User.associate = models => {
    User.belongsToMany(models.Campground, {through: 'UserCampground'});
  };

  return User;
}