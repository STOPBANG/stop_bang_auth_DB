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
    const body = req.body;
    try {
      let a_image1, a_image2, a_image3;
      
      if(body.file != undefined){
        if(body.file.length == 1){
          await Agent.update(
            {
              a_image1:  body.file[0], 
            }, 
          { where: {agent_list_ra_regno: body.sys_regno} });
          // a_image1 = body.file[0];
        }
        else if(body.file.length == 2){
          await Agent.update(
            {
              a_image1: body.file[0], 
              a_image2: body.file[1], 
            }, 
          { where: {agent_list_ra_regno: body.sys_regno} });
          // a_image1 = body.file[0];
          // a_image2 = body.file[1];
        }
        else if(body.file.length == 3){
          await Agent.update(
            {
              a_image1: body.file[0], 
              a_image2: body.file[1], 
              a_image3: body.file[2],
              a_introduction: (body.introduction != undefined ? body.introduction : null)
            }, 
          { where: {agent_list_ra_regno: body.sys_regno} });
          // a_image1 = body.file[0];
          // a_image2 = body.file[1];
          // a_image3 = body.file[2];
        }
      }
      if(body.introduction != undefined){
        await Agent.update(
          {
            a_introduction: body.introduction
          }, 
        { where: {agent_list_ra_regno: body.sys_regno} });
      }
      // await Agent.update(
      //   {
      //     a_image1: a_image1, 
      //     a_image2: a_image2, 
      //     a_image3: a_image3, 
      //     a_introduction: (body.introduction != undefined ? body.introduction : null)
      //   }, 
      // { where: {agent_list_ra_regno: body.sys_regno} });
      return res.json({});
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateEnteredInfo: async (req, res) => {
    const body = req.body;
    try {
      if(body.file != undefined){
        await Agent.update(
          {
            a_profile_image: body.file,
          },
          { where: {agent_list_ra_regno: body.sys_regno} });
      }
      if(body.a_office_hours != undefined){
        await Agent.update(
          {
            a_office_hours : body.a_office_hours
          },
          { where: {agent_list_ra_regno: body.sys_regno} });
      }
      return res.json({});
    } catch (error) {
      console.log(error);
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