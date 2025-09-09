import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NGOSignup from './components/NGOSignup';
import BuyerSignup from './components/BuyerSignup';
import AuditorSignup from './components/AuditorSignup';
import Login from './components/Login';
import NGODashboard from './components/NGODashboard/NGODashboard';
import BuyerDashboard from './components/BuyerDashboard';
import AuditorDashboard from './components/AuditorDashboard'
import TestPage from './components/testPage';
import CreditDetails from './components/CreditDetails'
import { getHealth } from "./api/api"
import Home from './components/Home';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CCProvider } from './context/SmartContractConnector';
import { jwtDecode } from "jwt-decode";
import { SiRender } from "react-icons/si";




const App = () => {
  const [user, setUser] = useState(null);
  const [backendReady, setBackendReady] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  //checkbackend function sends req @ /api/healthz route using getHealth() middleware
  useEffect(() => {

    const checkbackend = async () => {
      try {
        const res = await getHealth();
        if (res.status === 200) {
          setBackendReady(true);
        }
        else {
          setTimeout(checkbackend, 2000);
        }
      } catch {
        setTimeout(checkbackend, 2000);
      }
    };
    checkbackend();
  }, []);

  useEffect(() => {
    document.title = "Carbon Credits";
    const token = localStorage.getItem('token');

    if (token) {
      console.log("token found!")
      try {
        const decodedToken = jwtDecode(token);
        const parsedSub = JSON.parse(decodedToken.sub);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        console.log(decodedToken);
        if (!isExpired) {
          console.log('token is alive');
          setUser({
            username: parsedSub.username,
            role: parsedSub.role
          });
          // let currentPath = window.location.pathname;
          // console.log(currentPath);
          // navigate(currentPath);
          if (window.location.pathname === '/' || window.location.pathname === '/login') {
            navigate(parsedSub.role === 'NGO' ? '/NGO-dashboard' : parsedSub.role === 'auditor' ? '/auditor-dashboard' : '/buyer-dashboard');
          }

        }
        else {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
          //redirect to login
        }
      } catch (error) {
        console.error("Token failure:", error);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (!backendReady) {
      navigate('/loading');
    } else {
      if (window.location.pathname === '/loading') {
        navigate('/home')
      }
    }
  }, [backendReady, navigate])

  //inline component
  const LoadingScreen = () => (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      <div>
        <SiRender />
      </div>
      Render is restarting the service...
    </div>
  );

  return (
    <CCProvider>
      {/* <Router> */}
      <div >
        <Navbar user={user} onLogout={handleLogout} />
        <div >
          <Routes>
            <Route path='/loading' element={<LoadingScreen />} />
            <Route path="/home" element={<Home />} />
            <Route path="/NGO-signup" element={<NGOSignup onLogin={handleLogin} />} />
            <Route path="/buyer-signup" element={<BuyerSignup onLogin={handleLogin} />} />
            <Route path="/auditor-signup" element={<AuditorSignup onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/credits/:creditId" element={<CreditDetails />} />
            <Route
              path="/NGO-dashboard"
              element={
                user && user.role === 'NGO' ?
                  <NGODashboard onLogout={handleLogout} /> :
                  <Navigate to="/login" replace />
              }
            />
            <Route
              path="/buyer-dashboard"
              element={
                user && user.role === 'buyer' ?
                  <BuyerDashboard onLogout={handleLogout} /> :
                  <Navigate to="/login" replace />
              }
            />
            <Route
              path="/auditor-dashboard"
              element={
                user && user.role === 'auditor' ?
                  <AuditorDashboard onLogout={handleLogout} /> :
                  <Navigate to="/login" replace />
              }
            />
            <Route path="/" element={
              user ?
                user.role === 'NGO' ? <Navigate to="/NGO-dashboard" replace /> : user.role === 'auditor' ? <Navigate to="/auditor-dashboard" /> : <Navigate to="/buyer-dashboard" replace />

                : <Navigate to="/home" replace />}
            />
          </Routes>;
        </div>
        <SpeedInsights />
      </div>
      {/* </Router> */}
    </CCProvider>
  );
};

export default App;
