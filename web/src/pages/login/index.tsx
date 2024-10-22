
import styles from './Login.module.css'
import {useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    return (
      <div className={styles.container}>
      <div id={styles.loginCard}>
        <h1>Login</h1>
        <div className={styles.inputContainer}>
          <h1>Email:</h1>
          <input type="text" />
        </div>
        <div className={styles.inputContainer}>
          <h1>Senha:</h1>
          <input type="text" />
        </div>
        <button id={styles.loginButton}>Enviar</button>
        <h2 id={styles.signUp} onClick={() => navigate('signUp')}>Criar uma conta</h2>
      </div>
      </div>
    )
  
}

export default Login