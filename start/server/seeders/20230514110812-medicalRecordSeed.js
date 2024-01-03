'use strict';

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


    const medicalRecords = []
    const diagnoses = [
      'Flu',
      'Hypertension',
      'GERD',
      'Tooth Decay'
    ]

    const treatments = [
      'Paracetamol medicine and Sleep',
      'Amlodipine, Diet, reducing salt, and exercise',
      'Promag, Diet, reducing spicy and fried food',
      'Ibuprofen at first, operation on next meet'
    ]

    const costs = [
      150_000,
      175_000,
      250_000,
      650_000
    ]

    for (let i = 0; i < 8; i++) {
      const randomDiagnosisIndex = Math.floor(Math.random() * diagnoses.length)

      medicalRecords.push({
        diagnosis: diagnoses[randomDiagnosisIndex],
        treatment: treatments[randomDiagnosisIndex],
        cost: costs[randomDiagnosisIndex],
        patientId: Math.floor(Math.random() * 5) + 1,
        doctorId: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    await queryInterface.bulkInsert('MedicalRecords', medicalRecords)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('MedicalRecords', {}, {
      restartIdentity: true
    })
  }
};
