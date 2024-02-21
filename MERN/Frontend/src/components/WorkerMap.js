import axios from "axios";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "blue",
      padding: "10px",
      borderRadius: "50%",
    }}
  >
    {text}
  </div>
);
export default function WorkerMap() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    // Fetch workers' data from the database using Axios
    axios
      .get("http://localhost:3000/admin/workers/getAllWorkers")
      .then((response) => {
        // Assuming your API returns an array of workers with lat and lng properties
        console.log(response);
        setWorkers(response.data);
        // console.log(response.data.map((x) => JSON.stringify(x)));
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
      });
  }, []);

  // const defaultProps = {
  //   center: {
  //     lat: 10.99835602,
  //     lng: 77.01502627,
  //   },
  //   zoom: 1,
  // };
  const defaultLocation = { lat: 33.6518, lng: 73.1566 }; // Coordinates for CUI, Islamabad
  const defaultZoom = 12;

  return (
    <div style={{ height: "85%", width: "95%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks" }}
        defaultCenter={defaultLocation}
        defaultZoom={defaultZoom}
      >
        {workers.map((worker) => (
          <Marker
            lat={worker.location.coordinates.lat / 1e6}
            lng={worker.location.coordinates / 1e6}
            text={worker.name} // You can customize the marker content here
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
