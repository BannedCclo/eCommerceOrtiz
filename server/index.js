const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));