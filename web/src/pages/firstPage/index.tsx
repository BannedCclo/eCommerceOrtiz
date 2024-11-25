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
  imageurl: string;
}

const FirstPage = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();
  const [userType, setUserType] = useState("user");
  const [userId, setUserId] = useState<number>(0);
  const [openForm, setOpenForm] = useState(false);
  const [productsArr, setProductsArr] = useState<Product[]>([]);
  const [filteredProductsArr, setFilteredProductsArr] = useState<Product[]>([]);
  const [filter, setFilter] = useState("none");
  const [filterType, setFilterType] = useState('maior')
  const [filterValue, setFilterValue] = useState(0)

  useEffect(() => {
    validarToken();
    syncProducts();
    handleFilter(null);
  }, []);

  useEffect(() => {
    handleFilter(filterValue)
  }, [filterValue,filter,filterType])

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
        handleFilter(null)
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

  function handleFilter(value : number | null) {
    if (filter == "value") {
      var filteredproducts = productsArr
      
      switch (filterType) {
        case 'maior':
          filteredproducts = productsArr.filter(product => product.value > (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
        case 'igual':
          filteredproducts = productsArr.filter(product => product.value === (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
        case 'menor':
          filteredproducts = productsArr.filter(product => product.value < (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
      }
    }
    else if (filter == "quantity") {
      var filteredproducts = productsArr
      switch (filterType) {
        case 'maior':
          filteredproducts = productsArr.filter(product => product.quantity > (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
        case 'igual':
          filteredproducts = productsArr.filter(product => product.quantity == (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
        case 'menor':
          filteredproducts = productsArr.filter(product => product.quantity < (value || filterValue))
          setFilteredProductsArr(filteredproducts)
        break;
      }
      console.log(filteredproducts)
    }
    else {
      setFilteredProductsArr(productsArr);
    }
  }

  return (
    <div className={styles.container}>
      {openForm && <Form id={-1} closeForm={closeForm} sync={syncProducts} />}
      <header id={styles.header}>
        <h1>E-commerce</h1>
        <div>
          {userType === "adm" && (
            <>
              <button onClick={() => navigate("/admOrders")}>
                <i className="fa-solid fa-truck"></i>
              </button>
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
              <button onClick={() => navigate("/orders")}>
                <i className="fa-solid fa-truck"></i>
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
      <div id={styles.filter}>
        <h2>Filtrar por:</h2>
        <select
          id=""
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value="none">Nenhum</option>
          <option value="value">Valor</option>
          <option value="quantity">Estoque</option>
        </select>
        {filter != "none" && (<>
          <select value={filterType} onChange={(e)=>{setFilterType(e.target.value)}}>
            <option value="maior">{'>'}</option>
            <option value="igual">{'='}</option>
            <option value="menor">{'<'}</option>
          </select>
          <input type="number" value={filterValue} onChange={(e)=>{setFilterValue(parseInt(e.target.value))}}/>
          </>
        )}
      </div>
      <div id={styles.ballsGrid}>
        {filteredProductsArr.map((product) => (
          <Product
            id={product.id}
            userType={userType}
            userId={userId}
            imageUrl={product.imageurl || NotFound}
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
