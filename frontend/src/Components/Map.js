import { React, useState } from "react";
import "./Map.css";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const cameraLocations = [
  { key: 1, location: { lat: 47.622087, lng: -122.355506 } },
  { key: 2, location: { lat: 47.627327, lng: -122.351486 } },
  { key: 3, location: { lat: 47.624754, lng: -122.34745 } },
  { key: 4, location: { lat: 47.633168, lng: -122.353196 } },
  { key: 5, location: { lat: 47.627166, lng: -122.346177 } },
];

function TrashMap() {
    const [selectedMarker, setSelectedMarker] = useState(null);

  const seattleCenter = { lat: 47.62092, lng: -122.350042 };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const handleMarkerClick = (key) => {
    setSelectedMarker(key);
  };

  return (
    <APIProvider
      apiKey={"AIzaSyAbatzFlJOnSiRU_S-qiDrBdrPyr3c9tWA"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={seattleCenter}
        mapId="SeattleExampleMap"
      >
        <PoiMarkers pois={cameraLocations} onMarkerClick={handleMarkerClick} />
        {selectedMarker && (
        <div className="cameraModal">
          <p>Marker Key: {selectedMarker}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
      </Map>
    </APIProvider>
  );
}

const PoiMarkers = ({ pois, onMarkerClick }) => {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => onMarkerClick(poi.key)}
        >
          <Pin background={"red"} glyphColor={"white"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};


export default TrashMap;
