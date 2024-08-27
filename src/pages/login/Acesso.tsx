import { IonPage } from '@ionic/react';
 
import './Acesso.css';
import { IonToast, IonCard, IonIcon ,IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import axios from 'axios';
import { ear } from 'ionicons/icons';
import { IonButton } from '@ionic/react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
const Acesso: React.FC = () => {
  const navigate = useHistory()

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async () => {
    try {
      const dados = await axios.post('http://localhost:1880/api/login', {
        email: email,
        passwd: password
      })
      localStorage.setItem('idUsuarioLogado', dados.data.userId)
      localStorage.setItem('token', dados.data.token)
      navigate.push('/home')
    } catch (e) {
      setIsOpen(true)
    }
  }
  
  return (
    <IonPage>

      <IonCard className='cartao-login'>
        <IonCardHeader>
          <IonCardTitle className='titulo-login'>Tech-ears</IonCardTitle> 
        </IonCardHeader>

        <IonCardContent className='conteudo-login'>
          
            <IonIcon className='techears-icon' icon={ear}></IonIcon>

        
                <input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                placeholder='E-mail' className='login-input'></input>

                <input 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                placeholder='Senha' type='password' className='login-input'></input>
   
                <IonButton onClick={handleLogin} className='botao-login' expand="block">Acessar</IonButton>
                <span id='fgtpswd'>Esqueceu sua senha?</span>
        </IonCardContent>
      </IonCard>


      <IonToast
      className='aviso-login'
          isOpen={isOpen}
          message="Erro fazer login"
          onDidDismiss={() => setIsOpen(false)}
          duration={5000}
        ></IonToast>
       
    </IonPage>
  );
};

export default Acesso;
