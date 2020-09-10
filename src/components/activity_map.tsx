import React, {useState} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {LatLng} from 'leaflet';

export interface Activity {

}

interface ActivityMapViewProps {
  activities: Array<Activity>;
}

const ActivityMapView = (props: ActivityMapViewProps) => {
  const [state, setState] = useState({
    lat: -37.8380,
    lng: 145.1440,
    zoom: 13
  })

  if (props.activities.length>0) {
    debugger;
  }
  // const polyline: L.Polyline = L.polyline().fromEncoded(props.activities[0].)

  // TODO: Centroid of selected activities, and have checkbox to uncheck and opt out of auto-centering
  const mapCenter: LatLng = new LatLng(state.lat, state.lng);

  return (
    <div className="map">
      <Map center={mapCenter} zoom={state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
      </Map>
    </div>
  );
}

export default ActivityMapView;