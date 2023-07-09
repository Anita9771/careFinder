import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { ProtectedRoute } from './components';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { AddHospital, HospitalList, Landing, LocateHospital, Login, SignUp, SearchRegion } from './pages';
import { Helmet } from 'react-helmet';
// const MyLazyComponent = React.lazy(() => import('./'));



function App() {
  return (
   <Router>
    <Helmet>
        <title>CareFinder</title>
        <meta name="description" content="A healthcare application providing care services in Nigeria" />
        <meta name="keywords" content="hospitals, care, care services, nigeria healthcare, healthcare, sick, health, hospitals around you" />
        {/* Add more meta tags as needed */}
      </Helmet>
    <UserAuthContextProvider>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/add-hospital" element={<ProtectedRoute><AddHospital /></ProtectedRoute>} />
      <Route exact path="/hospital-list" element={<ProtectedRoute><HospitalList /></ProtectedRoute>} />
      <Route exact path="/locate-hospital" element={<ProtectedRoute><LocateHospital /></ProtectedRoute>} />
      <Route exact path="/search-region" element={<ProtectedRoute><SearchRegion /></ProtectedRoute>} />

    </Routes>
    </UserAuthContextProvider>
   </Router>
  );
}

export default App;
