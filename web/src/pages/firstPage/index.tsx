import styles from "./First.module.css";
import api from "../../service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bola1 from "../../assets/bola1.jpg";
import bola2 from "../../assets/bola2.jpg";
import bola3 from "../../assets/bola3.png";
import bola4 from "../../assets/bola4.jpg";
import bola5 from "../../assets/bola5.webp";
import bola6 from "../../assets/bola6.webp";

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  type: string;
}

const FirstPage = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");

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
        setUserType(decodedToken.type);
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
        <div>
          {userType === "adm" && (
            <button onClick={() => navigate("/admin")}>
              <i className="fa-solid fa-screwdriver-wrench"></i>
            </button>
          )}
          <button
            onClick={() => {
              navigate("/login");
              localStorage.removeItem("token");
            }}
          >
            <i className="fa-solid fa-sign-out-alt"></i>
          </button>
        </div>
      </header>
      <div id={styles.ballsGrid}>
        <div className={styles.ball}>
          <img src={bola1} alt="" />
        </div>
        <div className={styles.ball}>
          <img src={bola2} alt="" />
        </div>
        <div className={styles.ball}>
          <img src={bola3} alt="" />
        </div>
        <div className={styles.ball}>
          <img src={bola4} alt="" />
        </div>
        <div className={styles.ball}>
          <img src={bola5} alt="" />
        </div>
        <div className={styles.ball}>
          <img src={bola6} alt="" />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
