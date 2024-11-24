import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "../../components/cartItem";
import { jwtDecode } from "jwt-decode";
import { User } from "../firstPage";
import { ProductProps } from "../../components/product";
import api from "../../service";

const Cart = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number>(0);
  const [items, setItems] = useState<cartItem[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  interface cartItem {
    id: number;
    productId: number;
    name: string;
    value: number;
    userId: number;
    quantity: number;
  }

  useEffect(() => {
    validarToken();
    sync();
  }, []);

  function sync() {
    api
      .get("/cartItems")
      .then((response) => {
        setItems(response.data);
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

  useEffect(() => {
    sumValue();
  }, [items]);

  function sumValue() {
    let sum = 0;
    items
      .filter((item) => item.userId === userId)
      .forEach((item) => {
        sum += item.value;
      });
    setTotalValue(sum);
  }

  function order() {
    api
      .post("/order", {
        userId: userId,
        items: items
          .filter((item) => item.userId === userId)
          .map((item) => {
            return item.productId;
          }),
        totalValue: totalValue,
        status: "Aguardando pagamento",
      })
      .then((response) => {
        api.delete(`/cartItems?userId=${userId}`).then(() => {
          sync();
        });
        console.log(response.data);
        alert("Pedido realizado com sucesso!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function teste() {
    api.get("/destroy");
  }

  return (
    <div>
      <header id={styles.header}>
        <h1 onClick={teste}>E-commerce</h1>
        <div>
          <button onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </header>
      <div id={styles.cartAll}>
        <div id={styles.itemsContainer}>
          {items
            .filter((item) => item.userId === userId)
            .map((item) => (
              <CartItem
                key={item.id}
                name={item.name}
                productId={item.productId}
                id={item.id}
                value={item.value}
                sync={sync}
              />
            ))}
        </div>
        <div id={styles.paymentInfos}>
          <h2>Total: {totalValue}</h2>
          <button onClick={order}>Finalizar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
