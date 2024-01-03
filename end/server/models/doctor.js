'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsTo(models.User, { foreignKey: 'userId' })
      Doctor.hasMany(models.MedicalRecord, { foreignKey: 'doctorId' })
    }
  }
  Doctor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    speciality: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};