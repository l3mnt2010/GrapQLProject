import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';

const RootRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <Loading />;

};

export default RootRoute;