import React, {useState} from 'react';
import {LatLng, Map, Marker, Popup, TileLayer} from 'react-leaflet';

export interface Activity {

}

interface ActivityMapViewProps {
  activities: Array<Activity>;
}

const ActivityMapView = (props: ActivityMapViewProps) => {
  const [state, setState] = useState({
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  })

  const mapCenter: LatLng = [state.lat, state.lng];

  return (
    <div className="map">
      {/*<Map center={mapCenter} zoom={state.zoom} />*/}
    </div>
  );
}

export default ActivityMapView;