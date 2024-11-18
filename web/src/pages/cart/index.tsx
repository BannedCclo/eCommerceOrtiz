import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    
  },[])

  return (
    <div>
      <header id={styles.header}>
        <h1>Tizão Bolas</h1>
        <div>
          <button onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Cart;
