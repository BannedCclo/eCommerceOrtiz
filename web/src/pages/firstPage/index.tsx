import styles from "./First.module.css";
import api from "../../service";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
}

const FirstPage = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();

  useEffect(() => {
    validarToken();
  }, []);

  function validarToken() {
    const token = localStorage.getItem("token") || "";
    api
      .get("/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const decodedToken: User = jwt_decode(token);
        console.log(decodedToken.type);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }

  return (
    <div className={styles.container}>
      <header id={styles.header}>
        <h1>Tizão Bolas</h1>
        <ul>
          <li>
            <i className="fa-solid fa-user-group"></i>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default FirstPage;
