import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Register from './Register';
import Login from './Login';

const AuthModal = ({ show, closeModal, isLogin, setIsLogin }) => {
  return (
    <Modal show={show} className='w-100 ' onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title className='fw-bold fs-3 px-2'>
          {isLogin ? 'Log in' : 'Sign up'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        {isLogin ? (
          <Login setIsLogin={setIsLogin} closeModal={closeModal} />
        ) : (
          <Register setIsLogin={setIsLogin} closeModal={closeModal} />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
