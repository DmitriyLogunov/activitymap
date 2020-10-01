import React, {useState} from 'react';
import '../styles/ActivityMap.css';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import polyUtil from 'polyline-encoded';
import FilteredActivities from "../classes/FilteredActivities";

interface ActivityMapProps {
  filteredActivities: FilteredActivities;
}

const ActivityMap = (props: ActivityMapProps) => {
  const [state, setState] = useState({
    lat: -37.8380,
    lng: 145.1440,
    zoom: 13
  })

  const polylines = new Array<Array<LatLng>>(0);

  for (const {activity, isMatching} of props.filteredActivities.getFilteredActivitiesAsArray()) {
    if (!isMatching) {
      continue;
    }

    const polyline = Array<LatLng>(0);

    const polylineEncoded = activity.map.summary_polyline;

    if (polylineEncoded) {
      const latLngs: Array<[number, number]> = polyUtil.decode(polylineEncoded);

      latLngs.map(polyLineNode => {
        const latitude = polyLineNode[0];
        const longitude = polyLineNode[1];

        polyline.push(new LatLng(latitude, longitude));
      })

      polylines.push(polyline);
    }
  };

  // TODO: Centroid of selected activities, and have checkbox to uncheck and opt out of auto-centering
  const mapCenter: LatLng = new LatLng(state.lat, state.lng);


  return (
    <div className="activity-map">
      <Map center={mapCenter} zoom={state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {polylines.map((polyline, index) =>
          <Polyline key={index} color="blue" positions={polyline} />
        )}
      </Map>
    </div>
  );
}

export default ActivityMap;