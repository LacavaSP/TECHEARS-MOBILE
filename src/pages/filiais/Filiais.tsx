import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
  
import './Filiais.css';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import React from 'react';
import customTechEarsNodeRedAxios from '../../global/customTechEarsNodeRedAxios';
import { useHistory } from 'react-router';
import { pencil } from 'ionicons/icons';
const Filiais: React.FC = () => {
  const history = useHistory()
  const [filiais, setFiliais] = React.useState<any>([])

  async function chamarListagemFiliais() {
    const respostaServidor = await customTechEarsNodeRedAxios.get('/api/filiais')
    setFiliais(respostaServidor.data)
  }

  const telaCadastro = () => {
    history.push('/filial-form')
  }

  const telaEdicao = (registro: any) => {
    history.push('/filial-edit/' + registro.id)
  }

  React.useEffect(() => {
    chamarListagemFiliais()
  }, [])
  
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          
          <IonTitle>Filiais</IonTitle>
     
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Filiais</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className='form-listagem'>

          <IonButton onClick={telaCadastro}>
            Cadastro de Filial
          </IonButton>
      
          <IonList class='techears-list'>

            {
              filiais.map((filial: any) => <>
                <IonItem>
                  <IonIcon onClick={(e:any) => telaEdicao(filial)} icon={pencil} color="primary"></IonIcon>
                  <IonLabel>{`${filial.matricula} - ${filial.nome}`}</IonLabel>
                </IonItem>
              </>)
            }
            
            
          </IonList>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Filiais;
