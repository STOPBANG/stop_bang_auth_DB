const Sequelize = require('sequelize');

module.exports = class Agent extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      agent_list_ra_regno: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      a_username: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      a_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      a_realname: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      a_email: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      a_auth: {
        type: Sequelize.TINYINT,
        allowNull: true,
        defaultValue: 0,
      },
      a_auth_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_introduction: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_office_hours: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_image1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_image2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      a_image3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_time: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored : true,
      modelName: 'agent',
      tableName: "agent",
      paranoid: false,
      charset: 'utf8mb4', // 이모티콘까지 입력받을수 있도록
      collate: 'utf8mb4_general_ci', // 이모티콘까지 입력받을수 있도록
    });
  }
  static associate(db) { }
}