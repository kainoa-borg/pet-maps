import { Marker, Popup, useMap } from "react-leaflet";
import { getAddressString } from "../helpers/MarkerFunctions.js"

export const OrgMarker = (props) => {
    let org = props.org;
    let key = props.key;
    let photo = props.photo;

    const map = useMap();

    const handleMarkerClick = (event) => {
      console.log(event.target);
      map.setView([event.target._latlng.lat, event.target._latlng.lng], 12);
    }

    return (
        <Marker key={key} position={[org.location.y, org.location.x]} eventHandlers={{click: handleMarkerClick}}>
          <Popup>
            <h4><a href={org.url}>{org.name}</a></h4>
            <img className="w-[100px] m-auto mt-1" src={photo}></img>
            <p>{getAddressString(org.address)}</p>
          </Popup>
        </Marker>
    )
}