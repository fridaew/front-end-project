import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import userIcon from '../assets/vector.png';
import { useUser } from '../context/UserProvider';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { user, setUser } = useUser();

  const toggleProfileDropdown = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogout = () => {
    setUser(null);
  };
  return (
    <nav className='nav'>
      <Link to='/' className='navbar-logo'>
        <img src={logo} alt="nav logo" height={70} width={170} />
      </Link>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? 'open' : ''}>
      {!user && (
        <ul className=''>
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
      )}
        <li>
          <NavLink to='/signup'>Register</NavLink>
        </li>
        {menuOpen && (
          <li>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
        )}

        <li className='navbar-icon' onClick={toggleProfileDropdown}>
          <img src={userIcon} alt="nav user icon" height={30} width={30} />
        </li>
        {openProfile && (
          <ul className='flex flex-col gap-2 dropDownProfile'>
            <li>
              <NavLink to='#'>User profile</NavLink>
            </li>
            {user ? (
              <li>
                <Link><button className='logout-btn' onClick={handleLogout}>Logout</button></Link>
              </li>
            ) : (
              menuOpen && (
                <li>
                  <NavLink to='/login'>Login</NavLink>
                </li>
              )
            )}
          </ul>
        )}
      </ul>
 
    </nav>
  );
};

export default Navbar;















