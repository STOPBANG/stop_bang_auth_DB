const Sequelize = require('sequelize');

const Agent = require('./tables/agent');
const AgentContact = require('./tables/agentContact');
const AgentList = require('./tables/agentList');
const Certification = require('./tables/certification');
const Resident = require('./tables/resident');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config); 

db.sequelize = sequelize;
db.Agent = Agent;
db.AgentContact = AgentContact;
db.AgentList = AgentList;
db.Certification = Certification;
db.Resident = Resident;

Agent.init(sequelize);
Agent.associate(db);
AgentContact.init(sequelize);
AgentContact.associate(db);
AgentList.init(sequelize);
AgentList.associate(db);
Certification.init(sequelize);
Certification.associate(db);
Resident.init(sequelize);
Resident.associate(db);

module.exports = db;