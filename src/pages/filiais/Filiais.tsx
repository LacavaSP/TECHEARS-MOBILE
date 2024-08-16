import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Filiais.css';

 
const Filiais: React.FC = () => {
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
        <ExploreContainer name="Filiais" />
      </IonContent>
    </IonPage>
  );
};

export default Filiais;
