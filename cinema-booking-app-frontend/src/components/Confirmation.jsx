import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { formatDate } from '../utils/utils';

const Confirmation = ({ showConfirm, setShowConfirm, purchase }) => {
  console.log(purchase);
  const bookedSeats = purchase?.seats?.join('; ');

  return (
    <ToastContainer
      className='p-5 mb-5'
      position={'bottom-end'}
      style={{ zIndex: 2 }}
    >
      <Toast show={showConfirm} onClose={() => setShowConfirm(false)}>
        <Toast.Header>
          <strong className='me-auto'>Congrats!</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>
          Woohoo, you booked the seat(s) for{' '}
          <span className='text-primary fw-bold'>{purchase.title}</span> on{' '}
          <span className='text-primary fw-bold'>
            {formatDate(purchase.start)}
          </span>
          . Your seats: (row, seat){' '}
          <span className='text-muted fw-bold'>{bookedSeats}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Confirmation;
