import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../service";
import { useState } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("user");

  function addUser() {
    if (userName === "" || userEmail === "" || userPassword === "") {
      alert("Preencha todos os campos!");
    } else {
      try {
        api
          .post("/user", {
            username: userName,
            email: userEmail,
            password: userPassword,
            type: userType,
          })
          .then(() => {
            api.get("/users");
          });
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div id={styles.signUpCard}>
        <h1>Cadastro</h1>
        <div className={styles.inputContainer}>
          <h1>Nome de usuário:</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Email:</h1>
          <input
            type="text"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Senha:</h1>
          <input
            type="text"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <h1>Tipo de usuário:</h1>
          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <option value="user">Usuário</option>
            <option value="adm">Administrador</option>
          </select>
        </div>
        <button id={styles.signUpButton} onClick={addUser}>
          Enviar
        </button>
        <h2 id={styles.login} onClick={() => navigate("/")}>
          Fazer login
        </h2>
      </div>
    </div>
  );
}

export default SignUp;
