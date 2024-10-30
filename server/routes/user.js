const express = require("express");
const User = require("../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "123";

router.get("/test", (req, res) => {
  try {
    res.status(401).send("Unauthenticated");
  } catch (error) {
    console.log(error);
  }
});

router.get("/users", async (req, res) => {
  const userArr = await User.findAll().catch((err) => console.log(err));
  res.json(userArr);
  console.log(userArr);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Senha incorreta" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  console.log(token);

  res.json({ token });
});

router.post("/user", async (req, res) => {
  const { username, email, password, type } = req.body;
  const newUser = await User.create({ username, email, password, type });
  res.json(newUser);
  console.log(newUser);
});

module.exports = router;
