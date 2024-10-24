const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.get('/test', ()=>{
    console.log('requisitou a api aq')
})

router.get('/users', async (req, res) => {
  const userArr = await User.findAll().catch((err) => console.log(err));
  res.json(userArr);
  console.log(userArr);
});

router.get('/user', async (req, res) => {
  const id = req.params.id;
  const userArr = await User.findAll();
  const user = userArr.find((user) => user.id === id);
  res.json(user);
});

router.post('/user', async (req, res) => {
  const { username, email, password, type } = req.body;
  const newUser = await User.create({ username, email, password, type});
  res.json(newUser);
  console.log(newUser);
});

module.exports =  router;