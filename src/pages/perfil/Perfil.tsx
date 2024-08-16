import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Perfil.css';
import React from 'react';
import customTechEarsNodeRedAxios from '../../global/customTechEarsNodeRedAxios';
import { useHistory } from 'react-router';
 

const Perfil: React.FC = () => {
  const history = useHistory()
  const [perfil, setPerfil] = React.useState<any>(null)
  async function obterPerfil() {
    try {
      const respostaServidor = await customTechEarsNodeRedAxios.get('/api/informacoes-usuario/' + localStorage.getItem('idUsuarioLogado'))
       
      setPerfil(respostaServidor.data)
    } catch(e) {
      window.alert('ERRO AO OBTER PERFIL')
    }
  }

  React.useEffect(() => {
    obterPerfil()
  }, [])
  return (
    <IonPage>

      <IonCard className='cartao-tela-inicial'>
        <img alt="Silhouette of mountains" src={perfil?.foto ? (perfil.cabecalhoBase64 + ',' + perfil.foto) : 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*g09N-jl7JtVjVZGcd-vL2g.jpeg'} />
        <IonCardHeader>
            <IonCardTitle className='tituloTelaInicial'>Perfil</IonCardTitle>
           
        </IonCardHeader>

        <IonCardContent>

           {/* Seção para exibir as informações do perfil */}
           {perfil && (
            <div className="perfil-info">
              <p><strong>Nome:</strong> {perfil.name}</p>
              <p><strong>CPF:</strong> {perfil.cpf}</p>
              <p><strong>RG:</strong> {perfil.rg}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
            </div>
          )}

          <IonButton 
            onClick={() => {
              localStorage.clear()
              history.push('/acesso')
            }}
            className='deslogar'> Deslogar </IonButton>

        </IonCardContent>
      </IonCard>    

  
    </IonPage>
  );
};

export default Perfil;
