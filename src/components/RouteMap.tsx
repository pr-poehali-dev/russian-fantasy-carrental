import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon as LeafletIcon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

interface Route {
  id: number;
  city: string;
  region: string;
  distance: string;
  duration: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface RouteMapProps {
  routes: Route[];
  selectedRoute: Route | null;
  onRouteSelect: (route: Route) => void;
}

const moscowCoords: LatLngExpression = [55.7558, 37.6173];

const createIcon = (isSelected: boolean) => {
  return new LeafletIcon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${isSelected ? '#f59e0b' : '#3b82f6'}" stroke="white" stroke-width="3" opacity="0.9"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const moscowIcon = new LeafletIcon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#ef4444" stroke="white" stroke-width="3" opacity="0.8"/>
      <circle cx="20" cy="20" r="8" fill="white"/>
    </svg>
  `)}`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

export default function RouteMap({ routes, selectedRoute, onRouteSelect }: RouteMapProps) {
  useEffect(() => {
    delete (LeafletIcon.Default.prototype as any)._getIconUrl;
    LeafletIcon.Default.mergeOptions({
      iconUrl: '',
      iconRetinaUrl: '',
      shadowUrl: ''
    });
  }, []);

  return (
    <MapContainer
      center={[61, 90]}
      zoom={3}
      className="w-full h-full rounded-xl"
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={moscowCoords} icon={moscowIcon}>
        <Popup>
          <div className="text-center">
            <div className="font-bold text-base">МОСКВА</div>
            <div className="text-sm text-gray-600">Точка старта</div>
          </div>
        </Popup>
      </Marker>

      {routes.map((route) => {
        const routeCoords: LatLngExpression = [route.coords.lat, route.coords.lng];
        const isSelected = selectedRoute?.id === route.id;
        
        return (
          <div key={route.id}>
            <Marker
              position={routeCoords}
              icon={createIcon(isSelected)}
              eventHandlers={{
                click: () => onRouteSelect(route)
              }}
            >
              <Popup>
                <div className="text-center">
                  <div className="font-bold text-base">{route.city}</div>
                  <div className="text-sm text-gray-600">{route.region}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {route.distance} • {route.duration}
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {isSelected && (
              <Polyline
                positions={[moscowCoords, routeCoords]}
                color="#f59e0b"
                weight={3}
                opacity={0.7}
                dashArray="10, 10"
              />
            )}
          </div>
        );
      })}
    </MapContainer>
  );
}
