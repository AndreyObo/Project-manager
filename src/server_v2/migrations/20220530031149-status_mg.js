'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'breakpoints',
      'status',
      Sequelize.STRING
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'breakpoints',
      'status'
    );
  }
};
