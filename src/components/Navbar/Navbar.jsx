/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentPage } = useParams();

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  const renderTitle = () => {
    if (!currentPage || currentPage === '/home' || currentPage === '/') {
      return <div className="current">All Events</div>;
    }
    const formattedTitle = currentPage.slice(1).charAt(0).toUpperCase() + currentPage.slice(2);
    return <div className="current">{formattedTitle}</div>;
  };

  return (
    <nav>
      {currentPage === '/home' || currentPage === '/' ? (
        <NavLink to="/details">
          <GiHamburgerMenu />
        </NavLink>
      ) : (
        <NavLink to="#" onClick={goBack}>
          <IoIosArrowBack className="arrow" />
        </NavLink>
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
