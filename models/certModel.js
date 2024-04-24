const Certification = require('../database/models/tables/certification');

const _makeCertificationKey = () => {
  var key = ""; // 인증키

  // 난수 생성 후 인증키로 활용
  for (var i = 0; i < 5; i++) {
    key = key + Math.floor(Math.random() * (10 - 0));
  }

  return key;
};

module.exports = {
  create: async (req, res) => {
    const email = req.body.email;

    const code = _makeCertificationKey();

    const cert = await Certification.findOne({ where: {email: email} });

    if (cert) {
      await Certification.update({ code: code }, { where: {email: email} });
    } else {
      await Certification.create({ email: email, code: code });
    }
    return res.json({ email: email, code: code });
  },
  compare: async (req, res) => {
    const body = req.body;
    const cert = await Certification.findAll({ where: {email: body.email, code: body.code}});

    return res.json(cert);
  }
}