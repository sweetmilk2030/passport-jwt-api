'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Roles = sequelize.define('User_Roles', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  User_Roles.associate = function(models) {
    // associations can be defined here
  };
  return User_Roles;
};