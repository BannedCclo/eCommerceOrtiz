import { useState, useEffect } from "react";
import styles from "./AdmOrder.module.css";
import api from "../../service";

export interface OrderProps {
  id: number;
  status: string;
  totalValue: number;
  userId: number;
}

const Order = ({ id, status, totalValue }: OrderProps) => {
  const [orderStatus, setOrderStatus] = useState(status);

  useEffect(() => {
    api.put(`/order/${id}`, {
      status: orderStatus,
    });
  }, [orderStatus]);

  return (
    <div id={styles.order}>
      <h1>Pedido Nº {id}</h1>
      <h2>R${totalValue}</h2>
      <h2>Status:</h2>{" "}
      <select
        id={styles.status}
        value={orderStatus}
        onChange={(e) => {
          setOrderStatus(e.target.value);
        }}
      >
        <option value="Aguardando pagamento">Aguardando pagamento</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregue">Entregue</option>
      </select>
    </div>
  );
};

export default Order;
