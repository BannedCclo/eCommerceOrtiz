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

router.get("/validate-token", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "Token não fornecido" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ isValid: false, message: "Token inválido ou expirado" });
    }

    res.json({ isValid: true, type: decoded.type });
  });
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
    type: user.type,
    username: user.username,
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

router.delete("/user", async (req, res) => {
  const { id } = req.body;
  const deletedUser = await User.destroy({ where: { id } });
  res.json(deletedUser);
  console.log(deletedUser);
})

module.exports = router;
