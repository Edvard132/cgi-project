import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import api from '../api/axiosConfig';
import Form from 'react-bootstrap/Form';
import formatDate from '../utils/utils';
import { useGlobalContext } from '../context';
import Button from 'react-bootstrap/Button';
import GetCookie from '../hooks/getCookie';
import Confirmation from './Confirmation';
import RemoveCookie from '../hooks/removeCookie';

const Booking = ({ movie }) => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let [session, setSession] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const [purchase, setPurchase] = useState({});

  const { isAuthenticated, setAuthModalShow, setIsAuthenticated } =
    useGlobalContext();

  const getSessions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/getSessionsByMovieId/${movie.id}`);
      // console.log(response.data);
      if (response.data) {
        setIsLoading(false);
      }
      setSessions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cookie = GetCookie('AUTH');

  const bookSeats = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `/bookSeats/${session.id}${isAuthenticated ? `?email=${cookie}` : ''}`,
        {
          seatIds: session.seats
            .map((seat, i) => (seat.selected ? i : undefined))
            .filter((index) => index !== undefined),
        }
      );
      if (response.data) {
        setIsLoading(false);
      }

      if (response.data.length === 0) {
        setIsAuthenticated(false);
        RemoveCookie('AUTH');
        setAuthModalShow(true);
        return;
      }
      console.log(response.data);
      setSession({});
      setPurchase(response.data);
      setShowConfirm(true);
    } catch (err) {
      console.log(err);
    } finally {
      getSessions();
    }
  };

  const handleSelectSession = (e) => {
    if (e.target.value != -1) {
      setSession(sessions[e.target.value]);
      recommendSeat(sessions[e.target.value]);
      return;
    }
    setSession({});
  };

  const handleSelectSeat = (i) => {
    if (!isAuthenticated) {
      setAuthModalShow(true);
      return;
    }
    const updatedSeats = session.seats.map((seat, index) => {
      if (index === i && !seat.occupied) {
        if (seat.selected) {
          return { ...seat, selected: false };
        }
        if (seat.recommended) {
          return { ...seat, recommended: false, selected: true };
        }
        return { ...seat, selected: true };
      }
      return seat;
    });
    setSession({ ...session, seats: updatedSeats });
  };

  const recommendSeat = (session) => {
    const updatedSeats = session.seats.map((seat) => {
      if (
        !seat.occupied &&
        seat.rowNumber > 1 &&
        seat.rowNumber < 5 &&
        seat.seatNumber < 8 &&
        seat.seatNumber > 3
      ) {
        return { ...seat, recommended: true };
      }
      return seat;
    });
    setSession({ ...session, seats: updatedSeats });
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <div className='mt-5 d-flex '>
      {isLoading ? (
        <div className='mx-auto pt-3 text-muted fs-4'>Loading...</div>
      ) : (
        <>
          <div className='mx-md-auto'>
            <Form.Select onChange={handleSelectSession} className='w-100'>
              <option value={-1}>Choose a session start time</option>
              {sessions?.map((session, i) => (
                <option value={i} key={session.id}>
                  {formatDate(session.startDateTime)}
                </option>
              ))}
            </Form.Select>
            <div className='mt-4 d-flex' style={{ fontSize: '12px' }}>
              <div className='me-2 d-flex align-items-center text-muted'>
                <FontAwesomeIcon icon={faCouch} className='seat me-1' />{' '}
                Available
              </div>
              <div className='me-2 d-flex align-items-center text-muted'>
                <FontAwesomeIcon icon={faCouch} className='seat occupied ' />{' '}
                Occupied
              </div>
              <div className='d-flex align-items-center me-1 text-muted'>
                <FontAwesomeIcon icon={faCouch} className='seat recommended' />{' '}
                Recommended
              </div>
              <div className='me-2 d-flex align-items-center text-muted'>
                <FontAwesomeIcon
                  icon={faCouch}
                  className='seat me-2 selected'
                />{' '}
                Selected by you
              </div>
            </div>
            <div className='mt-4 seat-container justify-content-center mx-auto'>
              {session?.seats?.map((seat, i) => {
                const classes = [
                  'seat',
                  seat.occupied && 'occupied',
                  seat.selected && 'selected',
                  seat.recommended && 'recommended',
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <FontAwesomeIcon
                    style={!session.seats[i].occupied && { cursor: 'pointer' }}
                    key={i}
                    icon={faCouch}
                    className={classes}
                    onClick={() => handleSelectSeat(i)}
                  />
                );
              })}
            </div>
            {session?.seats?.length > 0 && (
              <>
                {' '}
                <p
                  className='mt-3 text-center text-dark fw-bold'
                  style={{ fontSize: '12px' }}
                >
                  Screen
                </p>
                <div className='text-center mt-4'>
                  <Button
                    variant='dark'
                    onClick={bookSeats}
                    className={`${
                      session.seats.filter((seat) => seat.selected).length ===
                        0 && 'disabled'
                    }`}
                  >
                    Confirm seats
                  </Button>
                </div>
              </>
            )}
            {showConfirm ? (
              <Confirmation
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                purchase={purchase}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Booking;
