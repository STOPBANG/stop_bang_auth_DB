const Sequelize = require('sequelize');

module.exports = class Certification extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      code: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
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