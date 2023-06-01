import React, { useState, useEffect } from 'react';
import logo from '.././spotify.png';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Routes, Route, useNavigate} from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const navigate = useNavigate();
   
  const navigateProfile= () => {
    // 👇️ navigate to /
    navigate('/profile');
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Expressify
            <img style={{marginLeft: 150,width: 40, height: 40 }} src={logo} /> 
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
               <span style={{fontWeight: 'bold'}}>Home</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/discovery'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <span style={{fontWeight: 'bold'}}>Discovery</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/statistics'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <span style={{fontWeight: 'bold'}}>Statistics</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/discussion'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                <span style={{fontWeight: 'bold'}}>Discussion</span>
              </Link>
            </li>
            

            <li>
              <Link
                to='/profile'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                <span style={{paddingTop: '5px',fontWeight: 'bold'}}>PROFILE</span>
              </Link>
            </li>
          </ul>
          {button && <Button onClick={navigateProfile} buttonStyle='btn--outline'>PROFILE</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;