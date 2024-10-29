const express = require("express");
const User = require("../model/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/test", () => {
  console.log("requisitou a api aq");
});

router.get("/users", async (req, res) => {
  const userArr = await User.findAll().catch((err) => console.log(err));
  res.json(userArr);
  console.log(userArr);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userArr = await User.findAll();
  const user = userArr.find((user) => user.email === email);

  if (user.password === password) {
    const payload = {
      id: user.id,
      email: user.email,
      // Outros campos que você quiser incluir no token
    };

    const token = jwt.sign(payload, "senhaSuperSecreta", { expiresIn: "1h" });

    console.log(token);

    res.json(token);
  }
});

router.post("/user", async (req, res) => {
  const { username, email, password, type } = req.body;
  const newUser = await User.create({ username, email, password, type });
  res.json(newUser);
  console.log(newUser);
});

module.exports = router;
