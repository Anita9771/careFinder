import { LocateHospital } from "../../pages";
// import { mount } from "enzyme";


// /*
// Code Analysis

// Objective:
// LocateHospital function is used to display a map with markers of hospitals within a certain radius of the user's current location. The function retrieves hospital data from a Firestore database and uses geohashing to filter the results based on proximity to the user.

// Inputs:
// - None

// Flow:
// - The function initializes state variables for latitude, longitude, markers, and map.
// - It calculates the geohash query bounds based on the user's current location and a specified radius.
// - It creates a Firestore query for each geohash query bound and collects the results into a single list.
// - It filters the list of matching documents based on proximity to the user's current location.
// - It maps the matching documents to marker objects and sets the markers state variable.
// - It initializes a Mapbox map instance and sets it to the map state variable.
// - It adds markers to the map for each hospital within the specified radius of the user's current location.
// - It returns a JSX element containing the map and a navbar component.

// Outputs:
// - JSX element containing a map and a navbar component.

// Additional aspects:
// - The function uses the geofire-common library to calculate geohash query bounds and distances between coordinates.
// - The function uses the Mapbox GL JS library to display the map and markers.
// - The function retrieves hospital data from a Firestore database using the Firebase SDK.
// - The function uses useEffect hooks to initialize the map and add markers to it.
// */



// describe('LocateHospital_function', () => {

//     // Tests that the map is initialized with the correct center and zoom level
//     it('test_map_initialized', () => {
//       // Arrange
//       const mockGeolocation = {
//         getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
//           coords: {
//             latitude: 10,
//             longitude: 20
//           }
//         })))
//       };
//       global.navigator.geolocation = mockGeolocation;
//       const mapboxgl = require('mapbox-gl');
//       mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//       const mapMock = {
//         setCenter: jest.fn(),
//         setZoom: jest.fn()
//       };
//       jest.spyOn(mapboxgl, 'Map').mockImplementation(() => mapMock);

//       // Act
//       const wrapper = mount(<LocateHospital />);

//       // Assert
//       expect(mapboxgl.Map).toHaveBeenCalledWith({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [20, 10],
//         zoom: 5
//       });
//     });

//     // Tests that markers are placed on the map for matching hospitals
//     it('test_markers_placed', async () => {
//       // Arrange
//       const mockGeolocation = {
//         getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
//           coords: {
//             latitude: 10,
//             longitude: 20
//           }
//         })))
//       };
//       global.navigator.geolocation = mockGeolocation;
//       const mapboxgl = require('mapbox-gl');
//       mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//       const mapMock = {
//         setCenter: jest.fn(),
//         setZoom: jest.fn(),
//         addControl: jest.fn(),
//         on: jest.fn()
//       };
//       jest.spyOn(mapboxgl, 'Map').mockImplementation(() => mapMock);
//       const getDocsMock = jest.fn().mockResolvedValue({
//         docs: [
//           {
//             get: jest.fn().mockReturnValue(10),
//           },
//           {
//             get: jest.fn().mockReturnValue(20),
//           }
//         ]
//       });
//       const queryMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const collectionMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const dbMock = {
//         collection: collectionMock
//       };
//       jest.mock('../lib/firebase', () => ({ db: dbMock }));

//       // Act
//       const wrapper = mount(<LocateHospital />);
//       await flushPromises();

//       // Assert
//       expect(mapboxgl.Marker).toHaveBeenCalledTimes(2);
//     });

//     // Tests that the popup displays the hospital name when a marker is clicked
//     it('test_popup_displays_name', async () => {
//       // Arrange
//       const mockGeolocation = {
//         getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
//           coords: {
//             latitude: 10,
//             longitude: 20
//           }
//         })))
//       };
//       global.navigator.geolocation = mockGeolocation;
//       const mapboxgl = require('mapbox-gl');
//       mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//       const mapMock = {
//         setCenter: jest.fn(),
//         setZoom: jest.fn(),
//         addControl: jest.fn(),
//         on: jest.fn()
//       };
//       jest.spyOn(mapboxgl, 'Map').mockImplementation(() => mapMock);
//       const getDocsMock = jest.fn().mockResolvedValue({
//         docs: [
//           {
//             get: jest.fn().mockReturnValue(10),
//           },
//           {
//             get: jest.fn().mockReturnValue(20),
//           }
//         ]
//       });
//       const queryMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const collectionMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const dbMock = {
//         collection: collectionMock
//       };
//       jest.mock('../lib/firebase', () => ({ db: dbMock }));

//       // Act
//       const wrapper = mount(<LocateHospital />);
//       await flushPromises();
//       const marker = wrapper.find(mapboxgl.Marker).at(0);
//       marker.props().setPopup({ setHTML: jest.fn() });
//       marker.props().setPopup().setHTML('test');

//       // Assert
//       expect(marker.props().popup._content).toBe('test');
//     });

//     // Tests that no markers are placed when no matching documents are found
//     it('test_no_matching_docs', async () => {
//       // Arrange
//       const mockGeolocation = {
//         getCurrentPosition: jest.fn().mockImplementationOnce((success) => Promise.resolve(success({
//           coords: {
//             latitude: 10,
//             longitude: 20
//           }
//         })))
//       };
//       global.navigator.geolocation = mockGeolocation;
//       const mapboxgl = require('mapbox-gl');
//       mapboxgl.accessToken = `${process.env.REACT_APP_MAP_API_KEY}`;
//       const mapMock = {
//         setCenter: jest.fn(),
//         setZoom: jest.fn(),
//         addControl: jest.fn(),
//         on: jest.fn()
//       };
//       jest.spyOn(mapboxgl, 'Map').mockImplementation(() => mapMock);
//       const getDocsMock = jest.fn().mockResolvedValue({
//         docs: []
//       });
//       const queryMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const collectionMock = jest.fn().mockReturnValue({
//         where: jest.fn().mockReturnThis(),
//         orderBy: jest.fn().mockReturnThis(),
//         get: getDocsMock
//       });
//       const dbMock = {
//         collection: collectionMock
//       };
//       jest.mock('../lib/firebase', () => ({ db: dbMock }));

//       // Act
//       const wrapper = mount(<LocateHospital />);
//       await flushPromises();

//       // Assert
//       expect(mapboxgl.Marker).not.toHaveBeenCalled();
//     });
// });
