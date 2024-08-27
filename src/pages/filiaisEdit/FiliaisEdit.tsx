import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
  
import './FiliaisEdit.css';
import { IonToast } from '@ionic/react';
import React from 'react';
import customTechEarsNodeRedAxios from '../../global/customTechEarsNodeRedAxios';
import { useHistory, useParams } from 'react-router';
import { MapContainer } from 'react-leaflet';
import MapComponentFilial from '../MapComponentFilial';
const FiliaisEdit: React.FC = () => {
  const history = useHistory() 

  const {id} = useParams()
  const [nome, setNome] = React.useState<any>('')
  const [mensagem, setMensagem] = React.useState<any>('')
  const [isOpen, setIsOpen] = React.useState<any>(false)
  const [matricula, setMatricula] = React.useState<any>('')
  const [coordenadorId, setCoordenadorId] = React.useState<any>('')
  const [geoX, setGeoX] = React.useState<any>(null)
  const [geoY, setGeoY] = React.useState<any>(null) 
  const [centroDoMapa, setCentroDoMapa] = React.useState<any>(null) 
  const [loading, setLoading] = React.useState<any>(true)
  const [loadingSave, setLoadingSave] = React.useState<any>(false)
   
  React.useEffect(() => {
    console.log(id)
    
    async function obterFilial () {
      try {
        setLoadingSave(true)
        const respostaServidor = await customTechEarsNodeRedAxios.get('/api/filial/' + id)
   
        const filial = respostaServidor.data
        console.log(filial)
        setCoordenadorId(parseInt(filial.coordenadorId))
        setGeoX(parseFloat(filial.geoX))
        setGeoY(parseFloat(filial.geoY))
        setNome(filial.nome)
        setMatricula(filial.matricula)
      } catch(e) {
        setMensagem('Erro ao consultar filial')
      } finally {
        setLoadingSave(false)
      }
    }

    if (id) {
      obterFilial()
    }

  }, [id])

  React.useEffect(() => {
    if (mensagem) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [mensagem])

  React.useEffect(() => {
    
    if (centroDoMapa?.length > 0) {
      setGeoX(centroDoMapa[0])
      setGeoY(centroDoMapa[1]) 

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

  async function handleFilialSave() {
    setLoadingSave(true)
    console.log('botao')
    const filial = {
      id: parseInt(id),
      matricula,
      nome,
      coordenadorId: parseInt(coordenadorId),
      geoX: geoX.toString(),
      geoY: geoY.toString(), 
    }

    try {
      await customTechEarsNodeRedAxios.put('api/filiais', filial)
      setMensagem('Filial Editada com Sucesso')
      window.location.reload()
    } catch(e) {
      setMensagem('Erro ao Editar Filial')
    } finally {
      setLoadingSave(false)
    }
  }
  
  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          
          <IonTitle>Edição de Filial</IonTitle>
     
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Edição de Filial</IonTitle>
          </IonToolbar>
        </IonHeader>

          {
            loadingSave ? (<h1>Salvando...</h1>) : ''
          }
        <div className={loadingSave ? 'Aguarde...' : ''}>
          
          

          <div className='container-botoes'>
            <IonButton className='botaoSalvar' onClick={handleFilialSave}>Salvar</IonButton>
          </div>
          <div className='form-filiais'>
        
            <IonInput label='Nome' value={nome} onBlur={(e: any) => { 
              setNome(e.target.value)
            }}></IonInput>
            <IonInput label='Matrícula' value={matricula} onBlur={(e: any) => setMatricula(e.target.value)}></IonInput>
            <IonInput label='Coordenador ID' value={coordenadorId} onBlur={(e: any) => setCoordenadorId(e.target.value)}></IonInput>
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
          
          <IonToast  
            isOpen={isOpen}
            message={mensagem}
            onDidDismiss={() => setMensagem('')}
            duration={15000}
          ></IonToast>

        </div>
      </IonContent>
      
    </IonPage>
  );
};

export default FiliaisEdit;
