import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../api/axiosConfig';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useGlobalContext } from '../context';
import PutCookie from '../hooks/putCookie';

const Login = ({ setIsLogin, closeModal }) => {
  const [errMessage, setErrMessage] = useState('');

  const { setIsAuthenticated } = useGlobalContext();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      setErrMessage('Please fill all fields');
      return;
    }
    if (!user.email.includes('@')) {
      setErrMessage('Please enter a valid email address');
      return;
    }

    try {
      const response = await api.post(`/login`, {
        email: user.email,
        password: user.password,
      });
      if (response.status === 200) {
        setErrMessage('');
        setIsAuthenticated(true);
        PutCookie('AUTH', user.email);
        closeModal();
      }
    } catch (err) {
      setErrMessage('Wrong email or password');

      console.log('Error: ', err);
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <FloatingLabel
            controlId='floatingInput'
            label='Email address'
            className='mb-3'
          >
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              className='form-control-lg custom-input'
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mt-2'>
          <FloatingLabel controlId='floatingPassword' label='Password'>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter password'
              className='form-control-lg custom-input'
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
      </Form>
      <Button
        type='submit'
        variant='dark'
        className='my-3 w-100 btn-lg'
        onClick={login}
      >
        Log in
      </Button>
      {errMessage && <p className='text-danger text-center'>{errMessage}</p>}

      <p
        className='text-center  mb-1 w-50 mx-auto'
        style={{ cursor: 'pointer' }}
        onClick={() => setIsLogin(false)}
      >
        <u>Don't have an account?</u>
      </p>
    </>
  );
};

export default Login;
