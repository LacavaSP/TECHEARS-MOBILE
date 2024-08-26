import { IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { MapContainer, } from 'react-leaflet'
 
import './Mapa.css';
import customTechEarsNodeRedAxios from '../../global/customTechEarsNodeRedAxios';
import MapComponentFiliais from '../MapComponentFiliais';
 
const Mapa: React.FC<any> = () => {
  const [centroDoMapa, setCentroDoMapa] = useState<any>(null) 
  const [filiais, setFiliais] = useState<any>([])
  const [loading, setLoading] = useState<any>(true)

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
  
  async function obterFiliais() {
    try {
      const respostaDoServidor = await customTechEarsNodeRedAxios.get(
        '/api/filiais/usuario-logado',
        {
          headers: {
            token: localStorage.getItem('idUsuarioLogado'),
          },
        }
      ) 
      setFiliais(respostaDoServidor.data)
    } catch (e) {
      console.log('ERRO AO OBTER FILIAIS ' + e)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      obterFiliais()
      pegaLocalizacaoDoUsuario()
      setLoading(false);
    }, 250);
  }, [])
  
  return (
    <>
      {
      !loading && (
        <>
          <div className='container-geo'>
          
            <div className='mapa-container'>
              
              <MapContainer
                center={centroDoMapa || [
                  -23.6486656,
                  -46.5076224
              ]}
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
              >
                <MapComponentFiliais
                  filiais={filiais}
                  centroDoMapa={centroDoMapa}
                />
              </MapContainer>
            </div>

          </div>
         
          
        </>
      )
    }
  </>
  );
};

export default Mapa;
