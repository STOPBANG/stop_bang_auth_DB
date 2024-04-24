const Resident = require('../database/models/tables/resident');
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  create: async (req, res) => {
    const body = req.body;
    try {
      // 비밀번호 암호화해서 db에 저장하기
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      // 새로운 사용자 생성하기
      const user = await Resident.create({
        r_username: body.username,
        r_password: passwordHash,
        r_phone: body.phone,
        r_realname: body.realname,
        r_email: body.email,
        r_birth: body.birth !== '' ? body.birth : null
      });

      // 새로 생성된 사용자 id 가져오기
      // return result(user.r_username);
    } catch (err) {
      console.error("🚀 ~ err:", err);
      // return result(null);
    }
  },
  findById: async (req, res) => {
    const username = req.body.username; // id는 로그인 시 사용하는 username

    try {
      const resident = await Resident.findAll({ where: {r_username: username}});
      if(resident) {
        return res.json(resident);
      }
      return res.json({});
    } catch(err) {
      console.log('[error] auth DB : ', err);
      return res.redirect('/');
    }
  },
  delete: async (req, res) => {
    const r_username = req.body.username;
    try {
      await Resident.destroy({ where: {r_username: r_username} });
      return 1;
    } catch (error) {
      return error;
    }
  },
}