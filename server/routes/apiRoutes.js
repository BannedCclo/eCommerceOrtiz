const express = require("express");
const User = require("../model/user");
const Product = require("../model/product");
const CartItem = require("../model/cartItem");
const Order = require("../model/order");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_KEY = "123";

router.get("/destroy", async (req, res) => {
  await Order.destroy({ where: {}, truncate: true });
});

router.get("/orders", async (req, res) => {
  const orderArr = await Order.findAll().catch((err) => console.log(err));
  res.json(orderArr);
  console.log(orderArr);
});

router.post("/order", async (req, res) => {
  const { userId, totalValue, status, items } = req.body;
  const newOrder = await Order.create({
    userId,
    totalValue,
    status,
    items,
  });
  res.json(newOrder);
  console.log(newOrder);
});

router.put("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Order.update({ status }, { where: { id } });
  res.json({ message: "Produto atualizado com sucesso" });
});

router.get("/cartItems", async (req, res) => {
  const cartItemArr = await CartItem.findAll().catch((err) => console.log(err));
  res.json(cartItemArr);
  console.log(cartItemArr);
});

router.delete("/cartItem", async (req, res) => {
  const { id } = req.query;
  await CartItem.destroy({ where: { id } });
  res.json({ message: "Item de carrinho excluído com sucesso" });
});

router.delete("/cartItems", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "O parâmetro userId é obrigatório." });
  }

  try {
    const deletedCount = await CartItem.destroy({ where: { userId } });
    if (deletedCount > 0) {
      res.json({ message: `${deletedCount} itens excluídos com sucesso.` });
    } else {
      res
        .status(404)
        .json({ message: "Nenhum item encontrado para o userId fornecido." });
    }
  } catch (error) {
    console.error("Erro ao excluir itens do carrinho:", error);
    res.status(500).json({ error: "Erro ao excluir itens do carrinho." });
  }
});

router.post("/cartItem", async (req, res) => {
  const { productId, userId, name, value } = req.body;
  console.log(productId, userId);
  const newCartItem = await CartItem.create({
    userId,
    productId,
    name,
    value,
  });
  res.json(newCartItem);
  console.log(newCartItem);
});

router.get("/products", async (req, res) => {
  const productArr = await Product.findAll().catch((err) => console.log(err));
  res.json(productArr);
  console.log(productArr);
});

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id } });
  res.json(product);
  console.log(product);
});

router.post("/product", async (req, res) => {
  const { name, value, quantity, imageurl } = req.body;
  const newProduct = await Product.create({ name, value, quantity, imageurl });
  res.json(newProduct);
  console.log(newProduct);
});

router.put("/product/:id", async (req, res) => {
  const { id } = req.params;
  const { name, value, quantity, imageurl } = req.body;
  await Product.update({ name, value, quantity, imageurl }, { where: { id } });
  res.json({ message: "Produto atualizado com sucesso" });
});

router.delete("/product", async (req, res) => {
  const { id } = req.body;
  const deletedProduct = await Product.destroy({ where: { id } });
  res.json(deletedProduct);
  console.log(deletedProduct);
});

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
});

module.exports = router;
