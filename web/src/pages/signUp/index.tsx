
import styles from './SignUp.module.css'
import {useNavigate} from 'react-router-dom'

function SignUp () {

    const navigate = useNavigate()

    return (
      <div className={styles.container}>
        <div id={styles.signUpCard}>
        <h1>Cadastro</h1>
        <div className={styles.inputContainer}>
          <h1>Nome de usuário:</h1>
          <input type="text" />
        </div>
        <div className={styles.inputContainer}>
          <h1>Email:</h1>
          <input type="text" />
        </div>
        <div className={styles.inputContainer}>
          <h1>Senha:</h1>
          <input type="text" />
        </div>
        <div className={styles.inputContainer}>
          <h1>Tipo de usuário:</h1>
          <select>
            <option value="adm">Administrador</option>
            <option value="user">Usuário</option>
          </select>
        </div>
        <button id={styles.signUpButton}>Enviar</button>
        <h2 id={styles.login} onClick={() => navigate('/')}>Fazer login</h2>
        </div>
      </div>
    )
}

export default SignUp