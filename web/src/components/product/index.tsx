import styles from "./Product.module.css";
import api from "../../service";
import Form from "../form";
import { useState, useEffect } from "react";

export interface ProductProps {
  id: number;
  userType: string;
  userId: number;
  imageUrl: string;
  name: string;
  value: number;
  quantity: number;
  sync: () => void;
}

const Product = ({
  id,
  userType,
  userId,
  name,
  imageUrl,
  value,
  quantity,
  sync,
}: ProductProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [currentCartItems, setCurrentCartItems] = useState([]);

  function closeForm() {
    setOpenForm(false);
  }

  function deleteProduct() {
    console.log("id");
    api
      .delete("/product", { data: { id: id } })
      .then(() => {
        sync();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addToCart() {
    console.log(userId);
    console.log(id);
    if (quantity > 1) {
      api
        .post("/cartItem", {
          productId: id,
          name: name,
          value: value,
          userId: userId,
        })
        .then(() => {
          const newQuantity = quantity - 1;
          api
            .put(`/product/${id}`, {
              quantity: newQuantity,
            })
            .then(() => {
              sync();
              closeForm();
            });
        });
    }

    //api.get("/orders");
  }

  return (
    <div className={styles.card}>
      {openForm && <Form id={id} sync={sync} closeForm={closeForm} />}
      <div id={styles.imgContainer}>
        <img src={imageUrl} alt="" />
      </div>
      <h1>{name}</h1>
      <h2>R${value}</h2>
      <p>Estoque: {quantity}</p>
      {userType === "adm" ? (
        <div id={styles.admButtons}>
          <button onClick={deleteProduct}>Excluir</button>
          <button
            onClick={() => {
              setOpenForm(true);
            }}
          >
            Editar
          </button>
        </div>
      ) : (
        <div id={styles.userButtons}>
          <button onClick={addToCart}>Adicionar ao carrinho</button>
        </div>
      )}
    </div>
  );
};

export default Product;
