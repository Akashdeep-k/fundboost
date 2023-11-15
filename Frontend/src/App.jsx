import { useContext, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar'  
import Home from './pages/Home';
import Sign from './pages/Sign';
import CreateCampaign from './pages/Create-campaign';
import Campaigns from './pages/Campaigns';
import AuthContext from './components/AuthProvider';

import LogIn from './pages/Log-in';
import SignUp from './pages/Sign-up';

function App() {
  const authCxt = useContext(AuthContext);
  const navigate = useNavigate();
  const routesWithNavbar = ['/'];
  const showNavbar = routesWithNavbar.includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
          <Route index element={<Home />} />
          <Route path="sign" element={<Sign />} />
          <Route path="createcampaign" element={<CreateCampaign />} />
          <Route path="campaigns" element={<Campaigns />} />
          {/* <Route path="log-in" element={<LogIn />} /> */}
          {/* <Route path="sign-up" element={<SignUp />} /> */}
      </Routes>
    </div>
  )
}

export default App
