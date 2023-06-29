/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const goBack = () => {
    if (currentPage !== 'home' || currentPage !== '/') {
      navigate(-1, { replace: true });
    }
  };

  const renderTitle = () => {
    if (!currentPage || currentPage === '/') {
      return <div className="current">All Events</div>;
    }
    const formattedTitle = currentPage.slice(1).charAt(0).toUpperCase() + currentPage.slice(2);
    return <div className="current">{formattedTitle}</div>;
  };

  return (
    <nav>
      {currentPage === 'home' || currentPage === '/' ? (
        <GiHamburgerMenu />
      ) : (
        <NavLink to="#" onClick={goBack}>
          <IoIosArrowBack className="arrow" />
        </NavLink>
      )}
      {currentPage === 'home' && (
        <div className="gi-container">
          <GiHamburgerMenu />
        </div>
      )}
      {renderTitle()}
      <div className="mic-settings">
        <BiMicrophone />
        <BsFillGearFill />
      </div>
    </nav>
  );
};

export default Navbar;
