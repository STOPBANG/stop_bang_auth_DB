const Agent = require('../database/models/tables/agent');
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  create: async (req, res) => {
    const body = req.body;
    try {
      // 비밀번호 암호화해서 db에 저장하기
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      // 새로운 사용자 생성하기
      const user = await Agent.create({
        a_username: body.username,
        a_password: passwordHash,
        a_realname: body.realname,
        a_email: body.email,
        a_phone: body.phone,
        agent_list_ra_regno: body.agentList_ra_regno,
      });

      // 새로 생성된 사용자의 ID 반환
      console.log("db 저장 성공");
      return res.json({id: user.id, userId: user.a_username});
    } catch (err) {
      console.error("회원가입 오류:", err);
      return res.redirect('/');
    }
  },
  findById: async (req, res) => {
    const username = req.body.username; // id는 로그인 시 사용하는 username

    try {
      const agent = await Agent.findAll({ where: {a_username: username}});
      if(agent) {
        return res.json(agent);
      }
      return res.json({});
    } catch(err) {
      console.log('[error] auth DB : ', err);
      return res.redirect('/');
    }
  },
  findByRaRegno: async (req, res) => {
    const ra_regno = req.params.ra_regno;

    try {
      const agent = await Agent.findAll({ where: {agent_list_ra_regno: ra_regno} });
      if(agent) {
        return res.json(agent);
      }
      return res.json({});
    } catch(err) {
      return res.redirect('/');
    }
  },
  update: async (req, res) => {
    const body = req.body;
    
    try {
      const agent = await Agent.update(
        {
          a_email: body.email,
        },
        { where: {
          a_username: body.userId
        }}
      );
      
      return res.json(agent);
    } catch(err) {
      console.log('[error] auth DB : ', err);
      return res.redirect('/');
    }
  },
  updatepw: async (req, res) => {
    const body = req.body;

    try {
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      const agent = await Agent.findOne({
        where: {a_username: body.userId}
      });
      
      if(!agent) return res.redirect('');
      const password = agent.dataValues.a_password;
      const test = await bcrypt.compare(body.oldpassword, password);
      if (!test) {
        return res.json({});
      } else {
        await agent.update({
          a_password: passwordHash
        });
        await agent.save();
        return res.json(agent);
      }
    } catch (error) {
      console.error(error);
      return res.json({});
    }
  },
  
  updateImage: async (req, res) => {
    const ra_regno = req.params.agentId;
    console.log(req.body);
    const files = req.body.files;
    const introduction = req.body.introduction;
    try {
      await Agent.update({a_image1: (files.myImage1 ? files.myImage1[0].filename : null)}, {a_image2 : (files.myImage2 ? files.myImage2[0].filename : null)}, {a_image3: (files.myImage3 ? files.myImage3[0].filename : null)}, {a_introduction: introduction}, { where: {agent_list_ra_regno: ra_regno} });
      return res.json({});
    } catch (error) {
      return error;
    }
  },

  delete: async (req, res) => {
    const a_username = req.body.userId;
    try {
      await Agent.destroy({ where: {a_username: a_username} });
      return res.json({});
    } catch (error) {
      return error;
    }
  },
}