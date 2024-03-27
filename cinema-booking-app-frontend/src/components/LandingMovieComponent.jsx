import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const LandingMovieComponent = ({ movie }) => {
  const { id, fromAge, posterLink, title, score, genres } = movie;

  return (
    <Col
      className='border rounded shadow  col-11'
      style={{ maxWidth: '500px' }}
    >
      <Row className='p-0'>
        <img
          className='rounded-top m-0 p-0 img-fluid'
          src={posterLink}
          alt={title + ' poster'}
        />
      </Row>
      <Row className='mt-3'>
        <div className='fs-4 text-dark text-wrap'>
          <u className=''>{title}</u>
        </div>
        <p className='text-secondary fw-light mb-2'>{genres.join(', ')}</p>
        <div className=' fw-light d-flex justify-content-between'>
          <div>
            <span className='text-muted'>IMDb:</span>
            <span className='ms-1 text-dark fw-bold'>{score}</span>
          </div>
          <span className='me-2'>PG-{fromAge}</span>
        </div>
      </Row>
      <Row className='my-3'>
        <Link to={`/movie/${id}`} className='w-50 mx-auto'>
          <Button className='w-100' variant='dark'>
            See more
          </Button>
        </Link>
      </Row>
    </Col>
  );
};

export default LandingMovieComponent;
