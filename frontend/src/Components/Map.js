import { React, useState } from "react";
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
      number_of_trash_found: 12,
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
      number_of_trash_found: 5,
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

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
        fullscreenControl={false}
        streetViewControl={false}
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
            <p style={{ color: '#757474', marginBottom: '10px' }}>Trash Mappings:</p>
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
          {selectedMarker === poi ? (
            <Pin
              background={"#22784F"}
              glyphColor={"white"}
              borderColor={"black"}
            />
          ) : (
            <Pin
              background={"#C1CFB8"}
              glyphColor={"white"}
              borderColor={"black"}
            />
          )}
        </AdvancedMarker>
      ))}
    </>
  );
};

export default TrashMap;
