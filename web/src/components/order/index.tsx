import React from "react";
import styles from "./Order.module.css";

export interface OrderProps {
  id: number;
  status: string;
  totalValue: number;
  userId: number;
}

const Order = ({ id, status, totalValue }: OrderProps) => {
  return (
    <div id={styles.order}>
      <h1>Pedido Nº {id}</h1>
      <h2>R${totalValue}</h2>
      <h2>Status: {status}</h2>
    </div>
  );
};

export default Order;
