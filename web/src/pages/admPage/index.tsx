import styles from "./AdmPage.module.css";
import api from "../../service";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../firstPage";

const AdmPage = () => {
  const jwt_decode = jwtDecode;
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    validarToken();

    updateUsers();
  }, []);

  function banUser(id: number) {
    api
      .delete("/user", {
        data: { id: id },
      })
      .then((response) => {
        console.log(response);
        updateUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateUsers() {
    api.get("/users").then((response) => {
      const token = localStorage.getItem("token") || "";
      const decodedToken: User = jwt_decode(token);
      const usersArr = response.data;
      const currentId = decodedToken.id;
      setUsers(usersArr.filter((user: User) => user.id != currentId));
    });
  }

  function validarToken() {
    const token = localStorage.getItem("token") || "";
    api
      .get("/validate-token", {
        headers: { Authorization: `Bearer ${token}` },
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
        <h1>E-commerce</h1>
        <div>
          <button onClick={() => navigate("/")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
      </header>
      <div id={styles.users}>
        {users.map((user) => (
          <div id={styles.card}>
            <h1>{user.username}</h1>
            <h2>{user.email}</h2>
            <button onClick={() => banUser(user.id)}>Banir</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmPage;
