const Agent = require('../database/models/tables/agent');

module.exports = {
  findById: async (req, res) => {
    const username = req.body.username; // id는 로그인 시 사용하는 username

    try {
      const agent = await Agent.findAll({ where: {a_username: username}});
      if(agent) {
        return res.json(agent.dataValues);
      }
      return res.json({});
    } catch(err) {
      console.log('[error] auth DB : ', err);
      return res.redirect('/');
    }
  },
  delete: async (req, res) => {
    const a_username = req.body.username;
    try {
      await Agent.destroy({ where: {a_username: a_username} });
      return 1;
    } catch (error) {
      return error;
    }
  },
}