import React, { useEffect, useState } from "react";
// import { firestore } from './firebaseConfig';
import styled from "styled-components";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { NewHospitalType } from "../types/hospitals";
import { hospitalsCol } from "../lib/controller";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoFireQuery } from "geofirex";
// import { geofire } from "geofire-common"
import { Geohash } from "geofire-common";
import { db } from "../lib/firebase";
import {
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
  doc,
  updateDoc,
  collection,
  GeoPoint,
} from "firebase/firestore";
// import { GeoPoint } from "../types/hospitals";

// import {  } from "firebase/firestore";
import ReactMapGL, { Marker } from "react-map-gl";
import { geohashQueryBounds, distanceBetween, Geopoint } from "geofire-common";
import { NavbarMain } from "../components";

const geofire = require("geofire-common");



const MainHeroDiv = styled.div`
  background-color: #e0e4ec;
  border-top: 5px solid #9393f7;
  min-height: 90vh;
  font-family: "Inter", sans-serif;
`;
// `${process.env.REACT_APP_MAP_API_KEY}`

function LocateHospital() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState<any[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const currentLocationHash = geofire.geohashForLocation([latitude, longitude]);
  const center = [latitude, longitude];
  const radiusInM = 50 * 1000;

  const bounds = geofire.geohashQueryBounds(center, radiusInM);

  const promises = [];

  for (const b of bounds) {
    const q = query(
      collection(db, "hospitals"),
      where("geohash", ">=", b[0]),
      where("geohash", "<=", b[1]),
      orderBy("geohash")
    );

    promises.push(getDocs(q));
  }
  // Collect all the query results together into a single list
  Promise.all(promises)
    .then((snapshots) => {
      const matchingDocs = [];

      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          // console.log("doc", doc);
          const lat = doc.get("lat");
          const lng = doc.get("lng");
          // console.log(lat, lng);
          if (typeof lat !== "number" || typeof lng !== "number") {
            continue; // Skip to the next document
          }

          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
          }
        }
      }

      return matchingDocs;
    })
    .then((matchingDocs) => {
      // Process the matching documents

      // Use the matchingDocs array to place markers on the map
      const markers = matchingDocs.map((doc: any) => ({
        // return {
        lat: doc.get("lat"),
        lng: doc.get("lng"),
        name: doc.get("Name"),
      }));
      setMarkers(markers);

      // console.log("markers", markers);
    })
    .catch((error) => {
      console.error("Error processing matching documents:", error);
    });


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position)
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
    const initializedMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 5,
    });

    setTimeout(() => {
      alert(
        "Markers identifies hospitals that are 50km from your current location. Click on a marker to see the name."
      );
    }, 5000);

    setMap(initializedMap);

    // Clean up the map instance when the component unmounts
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  if (map && latitude !== 0 && longitude !== 0) {
    markers.forEach((marker) => {
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setHTML(marker.name))
        .addTo(map);
    });
  }

  return (
    <>
      <NavbarMain />
      <MainHeroDiv
        id="map"
        style={{ height: "90vh", width: "100%" }}
      ></MainHeroDiv>
    </>
  );
}

export default LocateHospital;

// const LocateHospital = () => {
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const [currentLocation, setCurrentLocation] = useState<number[] | null>(null);
//   const [centerLatitude, setCenterLatitude] = useState(0);
//   const [centerLongitude, setCenterLongitude] = useState(0);

//   // type LatLng = {
//   //   lat: number;
//   //   lng: number;
//   // };

//   // Define a custom Geopoint type
//   type Geopoint = {
//     latitude: number;
//     longitude: number;
//   };

//   console.log(centerLatitude, centerLongitude);
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       // console.log(position)
//       setCenterLatitude(position.coords.latitude);
//       setCenterLongitude(position.coords.longitude);
//     });

//     // Initialize Mapbox GL map
//     mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//     const initializedMap = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [centerLongitude, centerLatitude], // Default center coordinates
//       zoom: 9, // Default zoom level
//     });

//     setTimeout(() => {
//       new mapboxgl.Marker()
//       .setLngLat([centerLongitude, centerLatitude]) // Set the marker coordinates
//       .addTo(initializedMap);

//       new mapboxgl.Popup({ closeOnClick: false })
//                 .setLngLat([centerLongitude, centerLatitude])
//                 .setHTML('<p>Your Location</p>')
//                 .addTo(initializedMap);
//     }, 5000)

//     setMap(initializedMap);
//   }, []);

//   useEffect(() => {
//     // Get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCurrentLocation([
//             position.coords.longitude,
//             position.coords.latitude,
//           ]);
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//         }
//       );
//     }
//   }, []);


  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     // console.log(position)
  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);
  //   });

  //   mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [longitude, latitude],
  //     zoom: 10,
  //   });

  //   markers.forEach((marker) => {
  //     new mapboxgl.Marker()
  //       .setLngLat([marker.lng, marker.lat])
  //       .setPopup(new mapboxgl.Popup().setHTML(marker.name))
  //       .addTo(map);
  //   });

  // }, [latitude, longitude, markers]);

//   useEffect(() => {
//     if (map && currentLocation) {
//       // Retrieve hospitals within 25km radius
//       const geopoint: GeoPoint = new GeoPoint(
//         currentLocation[1],
//         currentLocation[0]
//       );
//       const convertedGeopoint: Geopoint = {
//         latitude: Number(geopoint.latitude),
//         longitude: Number(geopoint.longitude),
//       };

//       // console.log(typeof latitude)
//       const bounds = convertedGeopoint
//         ? geohashQueryBounds(
//             [convertedGeopoint.latitude, convertedGeopoint.longitude],
//             25
//           ) ?? null
//         : null;

//       let hospitalsQuery;

//       if (bounds) {
//         hospitalsQuery = query(
//           collection(db, "hospitals"),
//           where("geohash", ">=", bounds[0]!),
//           where("geohash", "<=", bounds[1]!)
//         );
//       } else {
//         // Handle the case when bounds is null
//         // For example, you can return or display an error message
//         console.error("Invalid bounds");
//         return;
//       }

//       getDocs(hospitalsQuery)
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             const hospital = doc.data();
//             const lat = Number(hospital.Location?.latitude);
//             const lng = Number(hospital.Location?.longitude);
//             const name = hospital.Name;

//             if (lat !== undefined && lng !== undefined) {
//               const distance = distanceBetween(
//                 [lat, lng],
//                 currentLocation as any
//               );

//               if (distance <= 25000) {
//                 // Create marker for each hospital within 25km radius
//                 new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
//                 new mapboxgl.Popup({ closeOnClick: false })
//                 .setLngLat([lng, lat])
//                 .setHTML(name)
//                 .addTo(map);
//               }
//             }
//             console.log(lat);
//           });
//         })
//         .catch((error) => {
//           console.error("Error retrieving hospitals:", error);
//         });
//     }
//   }, [map, currentLocation]);

//   return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
// };

// export default LocateHospital;

//   console.log(hash);
//   console.log(latitude, longitude);

//   // const defaultProps = {
//   //   center: {
//   //     lat: 10.99835602,
//   //     lng: 77.01502627,
//   //   },
//   //   zoom: 11,
//   // };

//   return (
//     <div className="">
//       <Nav>
//         <NavH2>
//           <a href="#home">CareFinder</a>
//         </NavH2>

//         <UnList>
//           <ListItem>
//             <Link to="/">Home</Link>
//           </ListItem>
//           <ListItem>
//             <a href="#about">About</a>
//           </ListItem>
//           <ListItem>
//             <Link to="/hospital-list">Hospitals</Link>
//           </ListItem>
//         </UnList>

//         <div className="nav-btns">
//           <Link to="/login">
//             <Button>Login</Button>
//           </Link>
//           <Link to="/signup">
//             <Button>Sign up</Button>
//           </Link>
//         </div>
//       </Nav>
//       <div
//         style={{ backgroundColor: "#E0E4EC", borderTop: "5px solid #9393f7" }}
//       >
//         <h1>Locate Hospital</h1>
//         <p>Feature not yet implemented</p>
//       </div>

//       <div id="map" style={{ height: "100vh", width: "100%" }}></div>

//       {/* <div>
//       <h2>Current Location:</h2>
//       {geolocation.error ? (
//         <p>{geolocation.error.message}</p>
//       ) : (
//         <>
//           <p>Latitude: {geolocation.position.coords.latitude}</p>

//   // useEffect(() => {
//   //   if (geolocation.error) {
//   //     console.log('Geolocation error:', geolocation.error);
//   //   } else if (geolocation.position) {
//   //     const { latitude, longitude } = geolocation.position.coords;
//   //     setCurrentLocation(new firebase.firestore.GeoPoint(latitude, longitude));
//   //   }
//   // }, [geolocation]);
//   // useEffect(() => {
//   //   if (currentLocation) {
//   //     // Query Firestore for the document containing the GeoPoints
//   //     firestore.collection('locations').get()
//   //       .then((querySnapshot) => {
//   //         querySnapshot.forEach((doc) => {
//   //           const locationData = doc.data();
//   //           // Compare the user's current location with the GeoPoints in the document
//   //           const { latitude, longitude } = locationData.location;
//   //           const docLocation = new firebase.firestore.GeoPoint(latitude, longitude);

//   //           // Perform your comparison logic here
//   //           // For example, calculate the distance between currentLocation and docLocation
//   //           const distance = calculateDistance(currentLocation, docLocation);

//   //           console.log('Distance:', distance);
//   //         });
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error querying locations:', error);
//   //       });
//   //   }
//   // }, [currentLocation]);

//   // const calculateDistance = (location1, location2) => {
//   //   // Perform your distance calculation here
//   //   // This is just a placeholder function
//   //   // You can use libraries like geolib or implement your own distance calculation logic
//   //   // Example using geolib: geolib.getDistance(location1, location2);

//   //   return 0; // Return the calculated distance
//   // };
//           <p>Longitude: {geolocation.position.coords.longitude}</p>
//         </>
//       )}
//     </div> */}
//     </div>
//   );
// }

// export default LocateHospital;

// const LocateHospital = () => {
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const [currentLocation, setCurrentLocation] = useState<number[] | null>(null);
//   const [centerLatitude, setCenterLatitude] = useState(0);
//   const [centerLongitude, setCenterLongitude] = useState(0);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setCenterLatitude(position.coords.latitude);
//       setCenterLongitude(position.coords.longitude);
//     });
//   }, []);

//   useEffect(() => {
//     alert("82");
//     if (centerLatitude !== 0 && centerLongitude !== 0) {
//       mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//       const initializedMap = new mapboxgl.Map({
//         container: "map",
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [centerLongitude, centerLatitude],
//         zoom: 9,
//       });

//       setTimeout(() => {
//         new mapboxgl.Marker()
//           .setLngLat([centerLongitude, centerLatitude]) // Set the marker coordinates
//           .addTo(initializedMap);

//         new mapboxgl.Popup({ closeOnClick: false })
//           .setLngLat([centerLongitude, centerLatitude])
//           .setHTML("<p>Your Location</p>")
//           .addTo(initializedMap);
//       }, 5000);

//       setMap(initializedMap);
//     }
//   }, [centerLatitude, centerLongitude]);

//   useEffect(() => {
//     if (map && currentLocation) {
//       const geopoint = new GeoPoint(currentLocation[1], currentLocation[0]);
//       const bounds = geohashQueryBounds(
//         [geopoint.latitude, geopoint.longitude],
//         25
//       );

//       let hospitalsQuery;

//       if (bounds) {
//         hospitalsQuery = query(
//           collection(db, "hospitals"),
//           where("geohash", ">=", bounds[0]!),
//           where("geohash", "<=", bounds[1]!)
//         );
//       } else {
//         console.error("Invalid bounds");
//         return;
//       }

//       getDocs(hospitalsQuery)
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             const hospital = doc.data();
//             const lat = hospital.Location?.latitude;
//             const lng = hospital.Location?.longitude;
//             const name = hospital.Name;
//             alert(name);

//             if (lat && lng) {
//               const distance = distanceBetween(
//                 [lat, lng],
//                 currentLocation as any
//               );
//               alert("141");

//               if (distance <= 25000) {
//                 new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

//                 new mapboxgl.Popup({ closeOnClick: false })
//                   .setLngLat([lng, lat])
//                   .setHTML(name)
//                   .addTo(map);
//               }
//               alert("151");
//             }
//           });
//         })
//         .catch((error) => {
//           console.error("Error retrieving hospitals:", error);
//         });
//     }
//   }, [map, currentLocation]);

//   return (
//     <>
//       <Nav>
//         <NavH2>
//           <a href="#home">CareFinder</a>
//         </NavH2>

//         <UnList>
//           <ListItem>
//             <Link to="/">Home</Link>
//           </ListItem>
//           <ListItem>
//             <a href="#about">About</a>
//           </ListItem>
//           <ListItem>
//             <Link to="/hospital-list">Hospitals</Link>
//           </ListItem>
//         </UnList>

//         <div className="nav-btns">
//           <Link to="/login">
//             <Button>Login</Button>
//           </Link>
//           <Link to="/signup">
//             <Button>Sign up</Button>
//           </Link>
//         </div>
//       </Nav>
//       <div id="map" style={{ width: "100%", height: "90vh" }}></div>
//     </>
//   );
// };

// export default LocateHospital;

// .addControl(
//   new mapboxgl.GeolocateControl({
//   positionOptions: {
//   enableHighAccuracy: true
//   },
//   // When active the map will receive updates to the device's location as it changes.
//   trackUserLocation: true,
//   // Draw an arrow next to the location dot to indicate which direction the device is heading.
//   showUserHeading: true
//   })
//   );

// hospitalsCol.get().then((snapshot: any[]) => {
//   snapshot.forEach((doc) => {
//     const { latitude, longitude } = doc.data();

//     // Generate GeoHash using GeoFireX
//     const geohash = geofirex.geohashForLocation([latitude, longitude]);

//     // Update the document with the generated GeoHash
//     collectionRef.doc(doc.id).update({ geohash });
//   });
// });

// hospitalsCol.get().then((querySnapshot: any[]) => {
//   querySnapshot.forEach((doc) => {
//     const documentRef = hospitalsCol.doc(doc.id);
//     batch.update(documentRef, {
//       fieldName: fieldValue,
//     });
//   });

//   // Commit the batched write
//   return batch.commit();
// })
// .then(() => {
//   console.log('Field added to all documents successfully.');
// })
// .catch((error) => {
//   console.error('Error adding field to documents:', error);
// });

// return (
//   <ReactMapGL>
//     {markers.map((marker) => (
//       <Marker
//         key={marker.name}
//         latitude={marker.lat}
//         longitude={marker.lng}
//       >
//         {/* <div>Marker for {marker}</div> */}
//       </Marker>
//     ))}
//   </ReactMapGL>
// );
