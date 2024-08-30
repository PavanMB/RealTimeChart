// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './login';
import Dashboard from './Dashboard'; // Assuming you have a Dashboard component
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while Auth0 processes the login
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
