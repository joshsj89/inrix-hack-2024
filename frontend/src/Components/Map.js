import { React, useState, useRef, useCallback } from "react";
import "./Map.css";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

const cameraLocations = [
  {
    key: 1,
    location: { lat: 47.622087, lng: -122.355506 },
    trash: {
      what_I_see:
        "A red truck is parked on the side of a road, with a tree and a grassy area in front of it. There are several signs on the ground, including one that appears to be political in nature. The scene suggests a quiet, residential area with some autumnal foliage visible.",
      is_there_trash: true,
      number_of_trash_found: 3,
      trash_mappings: {
        signs: 3,
      },
    },
  },
  {
    key: 2,
    location: { lat: 47.627327, lng: -122.351486 },
    trash: {
      what_I_see: "There's some stuff.",
      is_there_trash: true,
      number_of_trash_found: 10,
      trash_mappings: {
        signs: 3,
        "beer cans": 4,
        cardboard: 5,
      },
    },
  },
  {
    key: 3,
    location: { lat: 47.624754, lng: -122.34745 },
    trash: {
      what_I_see: "Some more stuf.",
      is_there_trash: true,
      number_of_trash_found: 1,
      trash_mappings: {
        "car tire": 3,
        "trash bag": 2,
      },
    },
  },
  {
    key: 4,
    location: { lat: 47.633168, lng: -122.353196 },
    trash: {
      what_I_see: "Happy cat.",
      is_there_trash: true,
      number_of_trash_found: 3,
      trash_mappings: {
        cats: 3,
      },
    },
  },
  {
    key: 5,
    location: { lat: 47.627166, lng: -122.346177 },
    trash: {
      what_I_see: "Hello world.",
      is_there_trash: true,
      number_of_trash_found: 8,
      trash_mappings: {
        cans: 2,
        hilary: 3,
        alex: 2,
        josh: 1,
      },
    },
  },
];

function TrashMap() {
  const seattleCenter = { lat: 47.62092, lng: -122.350042 };
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [response, setResponse] = useState('');
  const mapRef = useRef(null); // Reference to the map instance

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };


  const handleCameraChange = useCallback((ev) => {    
    const coordsURL = "/camera-request?corner1=" + ev.detail.bounds.north + "|" + ev.detail.bounds.east + "&corner2=" + ev.detail.bounds.south + "|" + ev.detail.bounds.west;
    const response = fetch('http://localhost:5000'+ coordsURL); 
    
    setResponse(response);
    console.log(response);
  });

  return (
    <APIProvider
      apiKey={"AIzaSyAbatzFlJOnSiRU_S-qiDrBdrPyr3c9tWA"}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Map
        defaultZoom={13}
        defaultCenter={seattleCenter}
        mapId="SeattleExampleMap"
        fullscreenControl={false}
        streetViewControl={false}
        onCameraChanged={handleCameraChange}
      >
        <PoiMarkers
          pois={cameraLocations}
          onMarkerClick={handleMarkerClick}
          selectedMarker={selectedMarker}
        />
        {selectedMarker && (
          <div className="cameraModal">
            <div className="topOfCameraModal">
              <div className="babyTitleArea">
                <LocationOnIcon style={{ fontSize: "x-large", color: "#000" }} />
                <span>Area Name</span>
              </div>
              <button className="closeButton" onClick={handleCloseModal}>
                <CloseIcon style={{ fontSize: "large", color: "#000" }} />
              </button>
            </div>
            <p className="trashDescription">
              {selectedMarker.trash.what_I_see}
            </p>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p style={{ color: '#757474', marginBottom: '10px' }}>Trash Mappings:</p>
                <span
                  className="trashCount"
                  style={{
                    backgroundColor:
                      selectedMarker.trash.number_of_trash_found <= 1
                        ? "#FFDB58"
                        : selectedMarker.trash.number_of_trash_found > 1 &&
                          selectedMarker.trash.number_of_trash_found <= 3
                          ? "orange"
                          : "red",
                  }}
                >
                  {selectedMarker.trash.number_of_trash_found}
                </span>

              </div>
            </div>
            <div className="trashEntryContainer">
              {Object.entries(selectedMarker.trash.trash_mappings).map(
                ([type, count]) => (
                  <div className="trashEntry">
                    <DeleteIcon style={{ fontSize: "medium", color: "#757474" }} />
                    <span>
                      {type} - {count}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Map>
    </APIProvider>
  );
}

const PoiMarkers = ({ pois, onMarkerClick, selectedMarker }) => {
  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={() => onMarkerClick(poi)}
        >
          {poi.trash.number_of_trash_found <= 1 ? (
            <Pin
              background={"#FFDB58"}
              glyphColor={"white"}
              borderColor={"#FFDB58"}
              scale={poi === selectedMarker ? 1.5 : 1}
            />
          ) : 3 >= poi.trash.number_of_trash_found &&
            poi.trash.number_of_trash_found > 1 ? (
            <Pin
              background={"orange"}
              glyphColor={"white"}
              borderColor={"orange"}
              scale={poi === selectedMarker ? 1.5 : 1}
            />
          ) : (
            <Pin
              background={"red"}
              glyphColor={"white"}
              borderColor={"red"}
              scale={poi === selectedMarker ? 1.5 : 1}
            />
          )}
        </AdvancedMarker>
      ))}
    </>
  );
};

export default TrashMap;