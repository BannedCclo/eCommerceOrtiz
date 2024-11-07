import styles from "./AddForm.module.css";
import { useState } from "react";

interface FormProps {
  closeForm: () => void;
}

const AddForm = ({ closeForm }: FormProps) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);

  return (
    <div id={styles.formContainer}>
      <div id={styles.formCard}>
        <div className={styles.inputContainer}>
          <h1>Imagem:</h1>
          <input type="file" />
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
        <button id={styles.loginButton}>Cadastrar</button>
        <h2 id={styles.signUp} onClick={closeForm}>
          Cancelar
        </h2>
      </div>
    </div>
  );
};

export default AddForm;
