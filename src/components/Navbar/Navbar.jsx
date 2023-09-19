import React from 'react';
import { BiMicrophone } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;
  const goBack = () => {
    if (currentPage !== 'home' && currentPage !== '/') {
      navigate(-1);
    }
  };

  const renderTitle = () => {
    if (!currentPage || currentPage === '/') {
      return <div data-testid="current-page" className="current">All Events</div>;
    }
    const decodedTitle = decodeURIComponent(location.pathname.slice(1));
    const formattedTitle = decodedTitle.charAt(0).toUpperCase() + decodedTitle.slice(1);
    return <div className="current">{formattedTitle}</div>;
  };

  return (
    <nav>
      {currentPage === 'home' || currentPage === '/' ? (
        <GiHamburgerMenu data-testid="hamburger-menu" />
      ) : (
        <button type="button" onClick={goBack}>
          <IoIosArrowBack className="arrow" data-testid="back-button" />
        </button>
      )}
      {currentPage === 'home' && (
        <div className="gi-container">
          <GiHamburgerMenu />
        </div>
      )}
      {renderTitle()}
      <div className="mic-settings">
        <BiMicrophone data-testid="mic-icon" />
        <BsFillGearFill data-testid="gear-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
