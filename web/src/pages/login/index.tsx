
import styles from './Login.module.css'
import {useNavigate} from 'react-router-dom'
import api from '../../service'
import {useState} from 'react'

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  
}

function Login() {

    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

      function login() {
        try {
          api.get('/users').then((res)=>{
            const arr = res.data
            const user = arr.filter((user: User)=> user.email === userEmail && user.password === userPassword)
            if(user.length === 0){
              alert('Usuário ou senha incorretos')
              return
            } else {
              console.log(user[0])
            }
            
          })  
        }catch (error) {
          console.log(error)
        }   
      }

    return (
      <div className={styles.container}>
      <div id={styles.loginCard}>
        <h1>Login</h1>
        <div className={styles.inputContainer}>
          <h1>Email:</h1>
          <input type="text" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}/>
        </div>
        <div className={styles.inputContainer}>
          <h1>Senha:</h1>
          <input type="text" value={userPassword} onChange={(e)=>{setUserPassword(e.target.value)}}/>
        </div>
        <button id={styles.loginButton} onClick={login}>Enviar</button>
        <h2 id={styles.signUp} onClick={() => navigate('signUp')}>Criar uma conta</h2>
      </div>
      </div>
    )
  
}

export default Login