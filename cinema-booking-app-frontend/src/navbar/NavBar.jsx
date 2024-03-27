import React from 'react';
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthModal from '../auth/AuthModal';
import { useGlobalContext } from '../context';
import RemoveCookie from '../hooks/removeCookie';
import GetCookie from '../hooks/getCookie';

const Navibar = () => {
  const navigate = useNavigate();
  const {
    authModalShow,
    setAuthModalShow,
    isAuthenticated,
    setIsAuthenticated,
  } = useGlobalContext();

  const [isLogin, setIsLogin] = useState(true);

  const showModal = (authType) => {
    if (authType === 'login') {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setAuthModalShow(true);
  };

  const closeModal = () => {
    setAuthModalShow(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    RemoveCookie('AUTH');
    navigate('/');
  };

  useEffect(() => {
    const cookie = GetCookie('AUTH');
    if (cookie) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Navbar expand='lg' bg='dark' data-bs-theme='dark'>
        <Container fluid>
          <Navbar.Brand as={NavLink} to={'/'} className=''>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon
                icon={faVideo}
                className='ms-3 mx-3 fs-3 logod'
              />
              WORLD CINEMA
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navBarScroll'>
            <Nav className='ms-auto'>
              {isAuthenticated ? (
                <Button
                  variant='dark'
                  className='m-1 text-white px-3'
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Log out
                </Button>
              ) : (
                <>
                  <Button
                    variant='dark'
                    className='m-1 me-2 px-3  text-white'
                    onClick={() => showModal('login')}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} className='pe-2' />
                    Log in
                  </Button>
                  <Button
                    variant='dark '
                    className='px-3 m-1 me-3 text-white'
                    onClick={() => showModal('register')}
                  >
                    <FontAwesomeIcon icon={faUserPlus} className='pe-2' />
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        closeModal={closeModal}
        show={authModalShow}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </>
  );
};

export default Navibar;
