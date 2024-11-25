import styles from "./AdmOrders.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service";
import AdmOrder, { OrderProps } from "../../components/admOrder";
import { jwtDecode } from "jwt-decode";
import { User } from "../firstPage";

const Orders = () => {
  const jwt_decode = jwtDecode;
  const [userId, setUserId] = useState<number>(0);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  useEffect(() => {
    validarToken();
    sync();
  }, []);

  function sync() {
    api
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function validarToken() {
    const token = localStorage.getItem("token") || "";
    api
      .get("/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const decodedToken: User = jwt_decode(token);
        setUserId(decodedToken.id);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }

  return (
    <div>
      <header id={styles.header}>
        <h1>E-commerce</h1>
        <div>
          <button onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </header>
      <div id={styles.ordersBox}>
        {orders.map((order: OrderProps) => (
          <AdmOrder
            userId={order.userId}
            id={order.id}
            totalValue={order.totalValue}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
