const express = require('express');
const helmet = require('helmet');
const server = express();
const cors = require('cors');
const userRouter = require('../auth/signUp-router')


server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/', userRouter);


server.get('/', (req, res) => {
  res.status(200).json({Title: 'Build Week'});
});



server.post('/users', (req, res) => {
  users.insert(req.body)
  .then(users => {
    res.json(users);
  }).catch(err => res.send(err));
})






module.exports = server; 