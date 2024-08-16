import { useState, useEffect } from 'react';
import { TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

interface Filial {
  geoX: string;
  geoY: string;
}

interface MapComponentFiliaisProps {
  centroDoMapa: [number, number] | null;
  filiais: Filial[];
}

const MapComponentFiliais: React.FC<MapComponentFiliaisProps> = ({ centroDoMapa, filiais }) => {
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
      {filiais?.length > 0 && (
        <>
          {filiais.map((filial, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(filial.geoX),
                lng: parseFloat(filial.geoY),
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default MapComponentFiliais;
