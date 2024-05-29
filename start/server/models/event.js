'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: "userId" })
      Event.belongsTo(models.Game, { foreignKey: "gameId" })
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    totalPrize: DataTypes.STRING,
    eventPoster: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    eventType: DataTypes.STRING,
    eventStatus: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};