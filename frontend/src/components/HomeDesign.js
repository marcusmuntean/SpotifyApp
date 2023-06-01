import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HomeDesign.css';
import banner from '.././banner.png';
import './Button.css';
import { Link } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom';




function HomeDesign() {
    const navigate = useNavigate();
    const navigateDiscovery = () => {
    // 👇️ navigate to /
    navigate('/discovery');
  };
  const navigateProfile= () => {
    // 👇️ navigate to /
    navigate('/profile');
  };
  return (
    <div className='hero-container'>
      <img src={banner} />
      <h1> EXPLORE NEW HORIZONS</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          onClick={navigateDiscovery} 
          buttonSize='btn--large'
        >
          DISCOVERY
        </Button>
        <Button
          className='btns'
          onClick={navigateProfile}          
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          VIEW PROFILE
        </Button>
        {/* <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          VIEW PROFILE
        </Button> */}
      </div>
    </div>
  );
}

export default HomeDesign;