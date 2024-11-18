import styles from "./First.module.css";
import api from "../../service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../components/product";
import Form from "../../components/form";
import NotFound from "../../assets/notFound.png";

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  type: string;
}

export interface Product {
  id: number;
  name: string;
  value: number;
  quantity: number;
  imageUrl: string;
}

const FirstPage = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [userId, setUserId] = useState<number>(0);
  const [openForm, setOpenForm] = useState(false);
  const [productsArr, setProductsArr] = useState<Product[]>([]);

  useEffect(() => {
    validarToken();
    syncProducts();
  }, []);

  function closeForm() {
    setOpenForm(false);
  }

  function syncProducts() {
    api
      .get("/products")
      .then((response) => {
        const array = response.data;
        console.log(array);
        setProductsArr(array);
      })
      .catch((error) => {
        console.log(error);
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
        setUserType(decodedToken.type);
        setUserId(decodedToken.id);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }

  return (
    <div className={styles.container}>
      {openForm && <Form id={-1} closeForm={closeForm} sync={syncProducts} />}
      <header id={styles.header}>
        <h1>Tizão Bolas</h1>
        <div>
          {userType === "adm" && (
            <>
              <button onClick={() => navigate("/admin")}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </button>
              <button
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </>
          )}
          {userType === "user" && (
            <>
              <button onClick={() => navigate("/cart")}>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </>
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
        {productsArr.map((product) => (
          <Product
            id={product.id}
            userType={userType}
            userId={userId}
            imageUrl={product.imageUrl || NotFound}
            name={product.name}
            value={product.value}
            quantity={product.quantity}
            sync={syncProducts}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstPage;
