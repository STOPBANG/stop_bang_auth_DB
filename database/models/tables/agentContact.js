const Sequelize = require('sequelize');

module.exports = class AgentContact extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      contact_number: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      agent_agentList_ra_regno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored : true,
      modelName: 'agent_contact',
      tableName: "agent_contact",
      paranoid: false,
      charset: 'utf8mb4', // 이모티콘까지 입력받을수 있도록
      collate: 'utf8mb4_general_ci', // 이모티콘까지 입력받을수 있도록
    });
  }
  static associate(db) { }
}