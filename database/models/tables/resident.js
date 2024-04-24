const Sequelize = require('sequelize');

module.exports = class Resident extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      r_username: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      r_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      r_phone: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      r_realname: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      r_email: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      r_point: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      r_birth: {
        type: Sequelize.DATE,
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
      modelName: 'resident',
      tableName: "resident",
      paranoid: false,
      charset: 'utf8mb4', // 이모티콘까지 입력받을수 있도록
      collate: 'utf8mb4_general_ci', // 이모티콘까지 입력받을수 있도록
    });
  }
  static associate(db) { }
}