import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { ProtectedRoute } from './components';
import { UserAuthContextProvider } from './context/UserAuthContext';
import { AddHospital, HospitalList, Landing, LocateHospital, Login, SignUp, SearchRegion } from './pages';

// const MyLazyComponent = React.lazy(() => import('./'));



function App() {
  return (
   <Router>
    <UserAuthContextProvider>
    <Routes>
      {/* <Route exact path="/signup" element={<SignUpBg />}></Route> */}
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/add-hospital" element={<AddHospital />} />
      <Route exact path="/hospital-list" element={<HospitalList />} />
      <Route exact path="/locate-hospital" element={<LocateHospital />} />
      <Route exact path="/search-region" element={<SearchRegion />} />

    </Routes>
    </UserAuthContextProvider>
   </Router>
  );
}

export default App;
