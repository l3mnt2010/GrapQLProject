import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading';
import NavBar from '../components/Navbar/NavBar';

const HomePage = () => {
  const navigate = useNavigate();
  return <><NavBar/></>
};

export default HomePage;
