import styles from "./First.module.css";
import api from "../../service";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
}

const FirstPage = () => {
  function validarToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const email = decodedToken.email;
      const userArr = api.get("/users").then((response) => {
        const users = response.data.filter(
          (user: User) => user.email === email
        );
        if (users.length > 0) {
          console.log("Token válido");
        } else {
          console.log("Token inválido");
        }
      });
    } else {
      console.log("Token não encontrado");
    }
  }

  return (
    <div className={styles.container}>
      <button id="validaToken" onClick={validarToken}>
        Validar
      </button>
    </div>
  );
};

export default FirstPage;
