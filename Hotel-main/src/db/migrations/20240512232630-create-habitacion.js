'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Habitacion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idReserva: {
        type: Sequelize.INTEGER,
        references: {
          model:'Reserva',
          key: 'id'
        }
      },
      Estrellas: {
        type: Sequelize.INTEGER
      },
      CantPersonas: {
        type: Sequelize.INTEGER
      },
      Precio: {
        type: Sequelize.INTEGER
      },
      Habilitado: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Habitacion');
  }
};