const AgentList = require('../database/models/tables/agentList');

module.exports = {
  findById: async (req, res) => {
    const ra_regno = req.params.ra_regno;

    try {
      const agentData = await AgentList.findAll({ where: {ra_regno: ra_regno}});
      if(agentData) {
        return res.json(agentData);
      }
      return res.json({});
    } catch(err) {
      console.log('[error] auth DB : ', err);
      return res.redirect('/');
    }
  },
}