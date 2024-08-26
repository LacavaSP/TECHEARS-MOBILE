import { useState, useEffect } from 'react';
import { TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
 

const MapComponentFilial: React.FC<any> = ({ centroDoMapa, geoX, geoY, setGeoX, setGeoY }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (centroDoMapa) {
      map.setView(centroDoMapa, 4);
    }
  }, [centroDoMapa, map]);
 
 
  const MapEvents = () => {
    useMapEvents({
      click: (e: any) => {
        // PEGA CLIQUE NO MAPA
        console.log(e.latlng);
        setGeoX(e.latlng.lat)
        setGeoY(e.latlng.lng)
      },
    });
    return null;
  };

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      <MapEvents />
    
        <>
        

              <>
              {
                geoX && geoY && <>
                  <Marker 
                  position={{
                    lat:  geoX,
                    lng: geoY,
                  }}
                />
                </>
              }
                
              </>
           
           
       
        </>
 
    </>
  );
};

export default MapComponentFilial;
