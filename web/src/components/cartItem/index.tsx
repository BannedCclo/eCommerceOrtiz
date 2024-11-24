import React from "react";
import styles from "./CartItem.module.css";
import api from "../../service";

interface CartItemProps {
  id: number;
  productId: number;
  name: string;
  value: number;
  sync: () => void;
}

const CartItem = ({
  name,
  id,
  productId,
  value,
  sync,
}: CartItemProps) => {
  function removeFromCart() {
    api.get(`product/${productId}`).then((response) => {
      const quantity = response.data.quantity
      api.delete(`/cartItem?id=${id}`).then(() => {
        api.put(`/product/${productId}`, {
          quantity: quantity + 1,
        });
        sync();
      });
    })
    
  }

  return (
    <div id={styles.itemCard}>
      <h1>{name}</h1>
      <h1>{value}</h1>
      <button id={styles.deleteBtn}>
        <i className="fa-solid fa-x" onClick={removeFromCart}></i>
      </button>
    </div>
  );
};

export default CartItem;
