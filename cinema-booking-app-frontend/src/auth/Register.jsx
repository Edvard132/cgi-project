import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../api/axiosConfig';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useGlobalContext } from '../context';
import PutCookie from '../hooks/putCookie';

const Register = ({ setIsLogin, closeModal }) => {
  const [errMessage, setErrMessage] = useState([]);

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

  const signUp = async (e) => {
    e.preventDefault();

    if (!user.email || !user.email.includes('@')) {
      setErrMessage(['Please enter a valid email address']);
      return;
    }

    if (user.password.length < 8) {
      setErrMessage(['Password must be at least 8 characters long']);
      return;
    }

    if (user.password.length > 64) {
      setErrMessage(['Password must be between 8 and 64 characters long']);
      return;
    }

    if (!/\d/.test(user.password) || !/[a-zA-Z]/.test(user.password)) {
      setErrMessage(['Password must contain both letters and numbers']);
      return;
    }

    try {
      const response = await api.post(`/createUser`, {
        email: user.email,
        password: user.password,
      });

      if (response.status === 201) {
        setErrMessage('');
        setIsAuthenticated(true);
        PutCookie('AUTH', user.email);
        closeModal();
      } else {
        setErrMessage(['Wrong email format or weak password']);
      }
    } catch (err) {
      setErrMessage([err.response.data]);
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <FloatingLabel controlId='floatingInput' label='Email address'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              className='form-control-lg custom-input'
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId='formBasicPassword' className='mt-2 pt-2'>
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
        onClick={signUp}
      >
        Sign up
      </Button>
      {errMessage &&
        errMessage.map((err, i) => {
          return (
            <p key={i} className='text-danger text-center'>
              {err}
            </p>
          );
        })}

      <p
        className='text-center text-main-secondary mb-1 w-50 mx-auto'
        style={{ cursor: 'pointer' }}
        onClick={() => setIsLogin(true)}
      >
        <u>Already have an account?</u>
      </p>
    </>
  );
};

export default Register;
