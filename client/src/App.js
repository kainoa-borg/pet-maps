import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar';

// import * as L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import { EsriProvider } from 'leaflet-geosearch';
import { mapOrgs } from './helpers/MarkerFunctions.js'
import * as L from "leaflet";
import { getLatLng } from './helpers/latLongFuncs';

function App() {
  const [animalsList, setAnimalsList] = useState([]);
  const [organizationsList, setOrganizationsList] = useState([]);
  const [location, setLocation] = useState({x: -95, y: 40, zoom: 5});
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();


  const mapRef = (arg) => {
    setMap(arg);
  };

  useEffect(() => {
    let loc = getLatLng(location);
    loc.lat += .1;
    if (map) {
      // console.log(location);
      map.setView(getLatLng(loc), location.zoom);
      // if (location.bounds) {
        // let bounds = L.circle([location.bounds[0], location.bounds[1]], distance) 
        // map.panInsideBounds(L.latLngBounds(location.bounds[0], location.bounds[1]));
      // }
    }
  }, [location, map])

  useEffect(() => {    
    const provider = new EsriProvider();
    mapOrgs(organizationsList, provider, setMarkers);    
  }, [organizationsList])

  return (
    <div className="App">
      <div className="bg-[var(--primary-bg)] rounded-xl py-4 mt-4 md:w-[30%] w-[100%] absolute left-[50%] translate-x-[-50%] z-10">
        <h1 className="text-4xl pb-2 text-white">Pet Maps</h1>
        <SearchBar className="pb-2" setLocation={setLocation} setAnimalsList={setAnimalsList} setOrganizationsList={setOrganizationsList}/>
      </div>
      <div className="h-[100vh] w-[100vw] absolute">
        <MapContainer ref={mapRef} style={{height: "100%", width: "100%"}} center={[0, 0]} zoom={5} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            location.x !== -95 
            ?
            <Marker position={[location.y, location.x]}>
              <Popup style={{zIndex: 10}}>
                Your Location
              </Popup>
            </Marker>
            :
            <></>
          }
          {markers}
        </MapContainer>
      </div>

    </div>
  );
}

export default App;
