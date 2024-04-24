const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {sequelize} = require('./database/models/');
sequelize.sync({force : false});

const agentAuthRouter = require('./routers/agentAuthRouter.js');
const residentAuthRouter = require('./routers/residentAuthRouter.js');
const certRouter = require('./routers/certRouter.js');

app.use('/db/agent', agentAuthRouter);
app.use('/db/resident', residentAuthRouter);
app.use('/db/cert', certRouter);

app.listen(port, () => {
  console.log(`Auth DB app listening on port ${port}`)
})