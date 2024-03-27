import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import api from '../api/axiosConfig';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import Booking from '../components/Booking';

const SingleMovie = () => {
  const movieParams = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMovie = async () => {
    try {
      const response = await api.get(`/getMovie/${movieParams.id}`);
      if (response.data) {
        setIsLoading(false);
      }
      setMovie(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <Container className='d-flex flex-column ms-3 ms-md-0' fluid>
      {isLoading ? (
        <div className='text-center pt-3 text-muted fs-4'>Loading...</div>
      ) : (
        <>
          <div className='mx-auto'>
            <Row className=' mt-5 pt-5 '>
              <Col className='col-12 col-md-6 mb-4 '>
                <img
                  className='rounded shadow img-fluid'
                  src={movie.posterLink}
                />
              </Col>

              <Col className='col-12 col-md-6 ps-md-5 '>
                <p className='fs-4 text-dark'>
                  <u className=''>{movie.title}</u>
                </p>
                <p className='text-muted'>{movie.genres.join(', ')}</p>
                <div className=''>
                  <div className=''>
                    <p className=' text-muted'>
                      IMDb:
                      <span className='ms-1 text-dark fw-bold'>
                        {movie.score}
                      </span>
                    </p>

                    <p className='text-muted'>
                      From age:
                      <span className='ms-1 text-dark fw-bold me-1'>
                        {movie.fromAge}
                      </span>
                      (recommended)
                    </p>
                    <p className=' text-muted '>
                      Duration:
                      <span className='ms-1   text-dark fw-bold'>
                        {movie.duration}
                      </span>{' '}
                      min
                    </p>
                    <div className='mt-md-4'>
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <Button variant='outline-dark' className=''>
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className='me-2 '
                          />
                          Watch trailer
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <Booking movie={movie} />
        </>
      )}
    </Container>
  );
};

export default SingleMovie;
