import styles from "./First.module.css";
import api from "../../service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../components/product";
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
          <button onClick={() => navigate("/login")}>
            <i className="fa-solid fa-sign-out-alt"></i>
          </button>
        </div>
      </header>
      <div id={styles.ballsGrid}>
        <Product
          imageUrl="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/aventador/2023/02_09_refresh/aven_gate_s_01_m.jpg"
          name="Aventador"
          value={5000000}
          quantity={4}
        />
      </div>
    </div>
  );
};

export default FirstPage;
