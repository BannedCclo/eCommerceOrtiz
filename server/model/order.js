const { DataTypes } = require("sequelize");
const sequelize = require("../bd/bd");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [["Aguardando pagamento", "Enviado", "Entregue"]],
    },
  },
  items: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const value = this.getDataValue("items");
      return value ? JSON.parse(value) : [];
    },
    set(value) {
      this.setDataValue("items", JSON.stringify(value));
    },
  },
});

module.exports = Order;
