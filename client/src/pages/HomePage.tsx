import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import NavBar from '../components/Navbar/NavBar';

const HomePage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate('/login');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigate]);

  // return <Loading />;
  return <><NavBar/></>
};

export default HomePage;
