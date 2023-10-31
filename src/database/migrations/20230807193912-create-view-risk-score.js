'use strict'

const query = `
SELECT companyid,
               riskid,
               Round(SUM(riskscore) / Count(riskid), 2) AS riskScore
        FROM   (SELECT companyid,
                       r.id AS riskId,
                       re.questionid,
                       s.TYPE,
                       IF(s.TYPE = "multiple", 1 + Round(SUM(riskscore), 2),
                       Round(SUM(riskscore), 2))
                            AS riskScore
                FROM   selections s
                       join questions q
                         ON s.questionid = q.id
                       join risks r
                         ON q.riskid = r.id
                       join responses re
                         ON re.selectionid = s.id
                GROUP  BY companyid,
                          r.id,
                          questionid,
                          s.TYPE) riskByQuestion
        GROUP  BY companyid, riskid;
`
const viewName = 'viewRiskScore'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`CREATE VIEW ${viewName} AS ${query}`)
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP VIEW ${viewName}`)
  }
}