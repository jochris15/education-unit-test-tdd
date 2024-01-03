'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const patients = require('../data/patients.json').map((patient) => {
      patient.createdAt = new Date()
      patient.updatedAt = new Date()
      return patient
    })

    for (let i = 0; i < patients.length; i++) {
      const patientData = patients[i]

      const users = await queryInterface.bulkInsert('Users', [{
        username: patientData.username,
        password: patientData.password,
        role: 'Patient',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })

      await queryInterface.bulkInsert('Patients', [{
        fullname: patientData.fullname,
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Patients', {}, {})
  }
};
