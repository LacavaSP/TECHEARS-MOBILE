import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
  
import './FiliaisForm.css';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import React from 'react';
import customTechEarsNodeRedAxios from '../../global/customTechEarsNodeRedAxios';
import { useHistory } from 'react-router';
import { MapContainer } from 'react-leaflet';
import MapComponentFilial from '../MapComponentFilial';
const FiliaisForm: React.FC = () => {
  const history = useHistory()
  const [geoX, setGeoX] = React.useState<any>(null)
  const [geoY, setGeoY] = React.useState<any>(null)
  const [filial, setFilial] = React.useState<any>(null)
  const [centroDoMapa, setCentroDoMapa] = React.useState<any>(null) 
  const [loading, setLoading] = React.useState<any>(true)

  
  const telaListagem = () => {
    history.push('/filial-form')
  }

  React.useEffect(() => {
    
    if (centroDoMapa?.length > 0) {
      setGeoX(centroDoMapa[0])
      setGeoY(centroDoMapa[1])
      setFilial(
        {
          geoX,
          geoY
        }
      )

      setLoading(false)
    }

  }, [centroDoMapa])

  React.useEffect(() => { 
    pegaLocalizacaoDoUsuario()
  }, [])

  function pegaLocalizacaoDoUsuario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        const { latitude, longitude } = position.coords 
           
         setCentroDoMapa([latitude, longitude])
        },
        (error) => {
          console.error('Erro ao obter a localização: ', error)
          alert('Não foi possível obter sua localização.')
        }
      )
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.')
    }
  }
  
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          
          <IonTitle>Cadastro de Filiais</IonTitle>
     
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cadastro de Filiais</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <div className='form-filiais'>

          <IonInput label='Nome'></IonInput>
          <IonInput label='Matrícula'></IonInput>
          <IonInput label='Coordenador ID'></IonInput>
          <IonInput readonly={true} value={geoX} label='Latitude'></IonInput>
          <IonInput readonly={true} value={geoY} label='Longitude'></IonInput>
        </div>

        {!loading && (

          <>
            <MapContainer
                  center={centroDoMapa ? centroDoMapa : [
                    -23.6486656,
                    -46.5076224
                ]}
                  zoom={5} 
                  style={{ height: '250px', width: '100%' }}
                >
                  <MapComponentFilial
                    centroDoMapa={centroDoMapa}
                    geoX={geoX}
                    geoY={geoY}
                    setGeoX={setGeoX}
                    setGeoY={setGeoY}
                  >
                    
                  </MapComponentFilial>
            </MapContainer>
          </>
        )}
        
        
      </IonContent>
    </IonPage>
  );
};

export default FiliaisForm;
