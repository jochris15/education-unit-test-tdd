'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const doctors = require('../data/doctors.json')

    for (let i = 0; i < doctors.length; i++) {
      const doctorData = doctors[i]

      const users = await queryInterface.bulkInsert('Users', [{
        username: doctorData.username,
        password: hashPassword(doctorData.password),
        role: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true })

      await queryInterface.bulkInsert('Doctors', [{
        firstName: doctorData.firstName,
        lastName: doctorData.lastName,
        speciality: doctorData.speciality,
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

    await queryInterface.bulkDelete('Doctors', {}, {})
  }
};
