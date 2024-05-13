'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habitacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Habitacion.belongsTo(models.Reserva, {
      foreignKey: 'idReserva'
     })
    }
  }
  Habitacion.init({
    Estrellas: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    Precio: DataTypes.INTEGER,
    Habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Habitacion',
  });
  return Habitacion;
};