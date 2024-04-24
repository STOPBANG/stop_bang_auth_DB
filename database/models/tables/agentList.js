const Sequelize = require('sequelize');

module.exports = class AgentList extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      ra_regno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      rdealer_nm: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cmp_nm: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telno: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      sgg_nm: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      bjdong_nm: {
        type: Sequelize.STRING(45),
        allowNull: true,
      }
    },
    {
      sequelize,
      timestamps: false,
      underscored : true,
      modelName: 'agentList',
      tableName: "agentList",
      paranoid: false,
      charset: 'utf8mb4', // 이모티콘까지 입력받을수 있도록
      collate: 'utf8mb4_general_ci', // 이모티콘까지 입력받을수 있도록
    });
  }
  static associate(db) { }
}