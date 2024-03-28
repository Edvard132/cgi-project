import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import api from '../api/axiosConfig';
import LandingMovieComponent from '../components/LandingMovieComponent';
import Filters from '../components/Filters';
import Button from 'react-bootstrap/Button';
import { useGlobalContext } from '../context';
import GetCookie from '../hooks/getCookie';
import RemoveCookie from '../hooks/removeCookie';

const LandingPage = () => {
  let [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();

  let [filters, setFilters] = useState({
    genre: {},
    score: 0,
    fromAge: 3,
  });

  const [isRecommendShow, setIsRecommendShow] = useState(false);

  const getAllMovies = async (cookie) => {
    try {
      const response = await api.get(
        `/getAllMovies${isAuthenticated ? `?userEmail=${cookie}` : ''}`
      );

      if (response.data) {
        setIsLoading(false);
      }
      setMovies(response.data.movies);
      setPreferences(response.data.preferences);
      setFilters({
        ...filters,
        genre: response.data.genres,
      });
    } catch (err) {
      console.log('Error: ', err);
      if (err.response.status === 409) {
        setIsAuthenticated(false);
        RemoveCookie('AUTH');
        setMovies(err.resopnse.data.movies);
      }
    }
  };

  movies = movies.filter((movie) => {
    const selectedGenres = Object.keys(filters.genre).filter(
      (key) => filters.genre[key]
    );

    if (!movie.genres.some((g) => selectedGenres.includes(g))) {
      return false;
    }

    if (movie.score < filters.score) {
      return false;
    }

    if (movie.fromAge < filters.fromAge) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const cookie = GetCookie('AUTH');

    getAllMovies(cookie);
  }, [isAuthenticated]);

  return (
    <Container
      className='pt-5 mt-2 '
      style={{ width: '100%', minWidth: '800px' }}
      fluid
    >
      {isLoading ? (
        <div className='text-center pt-3 text-muted fs-4'>Loading...</div>
      ) : (
        <>
          <Row className='mb-5'>
            <div className='d-flex align-items-center justify-content-center gap-5'>
              <Button
                variant='outline-light'
                onClick={() => setIsRecommendShow(false)}
                className={`fw-bold display-6 btn-lg border-0 ${
                  !isRecommendShow
                    ? 'text-info text-decoration-underline'
                    : 'text-secondary'
                }`}
              >
                All movies
              </Button>

              <Button
                variant='outline-light'
                onClick={() => setIsRecommendShow(true)}
                className={`fw-bold display-6 btn-lg border-0 ${
                  isRecommendShow
                    ? 'text-info text-decoration-underline'
                    : 'text-secondary'
                }`}
              >
                Recommendations
              </Button>
            </div>
          </Row>
          <div className='d-flex justify-content-between'>
            <div style={{ minWidth: '200px', maxWidth: '200px' }} />
            {!isRecommendShow ? (
              <>
                <div className=' row justify-content-center gap-5'>
                  {movies?.map((movie) => (
                    <LandingMovieComponent key={movie.id} movie={movie} />
                  ))}
                </div>
                <div
                  className=''
                  style={{ minWidth: '350px', maxWidth: '350px' }}
                >
                  <p className='text-muted text-center fw-bold '>Filters</p>
                  <Filters filters={filters} setFilters={setFilters} />
                </div>
              </>
            ) : isAuthenticated ? (
              !preferences || preferences?.length === 0 ? (
                <>
                  <p className='fs-5 text-secondary '>
                    Nothing to recommend yet...
                  </p>
                  <div style={{ minWidth: '200px', maxWidth: '200px' }} />
                </>
              ) : (
                <>
                  <div className='row justify-content-center gap-5'>
                    {movies
                      ?.filter((movie) =>
                        movie.genres.some((g) => preferences?.includes(g))
                      )
                      .sort((a, b) => b.score - a.score)
                      .map((movie) => (
                        <LandingMovieComponent key={movie.id} movie={movie} />
                      ))}
                  </div>
                  <div style={{ minWidth: '200px', maxWidth: '200px' }} />
                </>
              )
            ) : (
              <>
                <p className='fs-5 text-secondary'>
                  Log in to see recommendations
                </p>
                <div style={{ minWidth: '200px', maxWidth: '200px' }} />
              </>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default LandingPage;
