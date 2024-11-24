import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import api from "../../service";
import { useNavigate } from "react-router-dom";

interface FormProps {
  id: number;
  closeForm: () => void;
  sync: () => void;
}

const Form = ({ id, closeForm, sync }: FormProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (id != -1) {
      api
        .get(`/product/${id}`)
        .then((response) => {
          setName(response.data.name);
          setValue(response.data.value);
          setQuantity(response.data.quantity);
          setImageUrl(response.data.imageurl);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function createProduct() {
    if (name === "" || value === 0 || quantity === 0) {
      alert("Preencha todos os campos!");
    } else {
      try {
        api
          .post("/product", {
            name: name,
            value: value,
            quantity: quantity,
            imageurl: imageUrl,
          })
          .then(() => {
            sync();
            api.get("/products");
          });
        alert("Produto cadastrado com sucesso!");
        closeForm();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function updateProduct() {
    try {
      api
        .put(`/product/${id}`, {
          name: name,
          value: value,
          quantity: quantity,
          imageurl: imageUrl,
        })
        .then(() => {
          sync();
          closeForm();
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit() {
    if (id == -1) {
      createProduct();
    } else {
      updateProduct();
    }
  }

  return (
    <div id={styles.formContainer}>
      <div id={styles.formCard}>
        <div className={styles.inputContainer}>
          <h1>Url da imagem:</h1>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Nome:</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Valor:</h1>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(parseFloat(e.target.value));
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Estoque:</h1>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
          />
        </div>
        <button id={styles.loginButton} onClick={handleSubmit}>
          Enviar
        </button>
        <h2 id={styles.signUp} onClick={closeForm}>
          Cancelar
        </h2>
      </div>
    </div>
  );
};

export default Form;
