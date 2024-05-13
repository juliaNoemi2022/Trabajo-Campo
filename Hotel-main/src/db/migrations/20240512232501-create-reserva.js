'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reserva', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCliente:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Cliente',
          key: 'id'
        }
      },
      dni: {
        type: Sequelize.INTEGER
      },
      Habitacion: {
        type: Sequelize.INTEGER
      },
      Estrellas: {
        type: Sequelize.INTEGER
      },
      CantPersonas: {
        type: Sequelize.INTEGER
      },
      FechaIngreso: {
        type: Sequelize.DATE
      },
      cantDias: {
        type: Sequelize.INTEGER
      },
      FechaEgreso: {
        type: Sequelize.DATE
      },
      Precio: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reserva');
  }
};