import * as L from "leaflet"

export const getLatLng = (pos) => {
    if (pos.coords) {
        return L.latLng(pos.coords.latitude, pos.coords.longitude);
    }
    if (typeof(pos) === "array") {
        return L.latLng(pos[0], pos[1]);
    }
    if (pos.x) {
        return L.latLng(pos.y, pos.x)
    }
    if (pos.lat) {
        return pos;
    }
}