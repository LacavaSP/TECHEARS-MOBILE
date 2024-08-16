import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab1.css';
import Mapa from './mapa/Mapa';

const Tab1: React.FC = () => {


  
  return (
    <IonPage>

      <IonCard className='cartao-tela-inicial'>
        <img alt="Silhouette of mountains" src="https://cdnm.westwing.com.br/glossary/uploads/br/2016/01/18152424/aparelhos-eletronicos-sobre-mesa-unsplash-c-a8321.jpg" />
        <IonCardHeader>
            <IonCardTitle className='tituloTelaInicial'>Seja Bem-Vindo(a)</IonCardTitle>
            <IonCardSubtitle>Tela Inicial</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>

            <Mapa></Mapa>
        </IonCardContent>
      </IonCard>    

  
    </IonPage>
  );
};

export default Tab1;
