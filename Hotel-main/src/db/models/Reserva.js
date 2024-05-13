'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reserva.belongsTo(models.Cliente, {
        as: 'Cliente',
        foreignKey: 'idCliente'
              })
              
      Reserva.hasMany(models.Habitacion, {
        as: 'Habitacion',
        foreignKey: 'idReserva'
      })
    }
  }
  Reserva.init({
    dni: DataTypes.INTEGER,
    Habitacion: DataTypes.INTEGER,
    Estrellas: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    FechaIngreso: DataTypes.DATE,
    cantDias: DataTypes.INTEGER,
    FechaEgreso: DataTypes.DATE,
    Precio: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};