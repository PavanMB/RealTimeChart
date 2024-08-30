// src/components/LandingPage.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirect to the dashboard if already authenticated
    } else {
      loginWithRedirect(); // Trigger Auth0 login if not authenticated
    }
  }, [isAuthenticated, loginWithRedirect, navigate]);

  return (
    <div>
      <h1>Redirecting to login...</h1>
    </div>
  );
};

export default LandingPage;
