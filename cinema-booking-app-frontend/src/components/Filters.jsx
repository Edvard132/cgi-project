import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Filters = ({ filters, setFilters }) => {
  const handleFieldChange = (event) => {
    let g = event.target.value;

    let updatedFilters = { ...filters };

    if (!updatedFilters.genre[g]) {
      updatedFilters.genre[g] = true;
    } else {
      updatedFilters.genre[g] = false;
    }

    setFilters(updatedFilters);
  };

  return (
    <div>
      <Accordion className='px-5' alwaysOpen>
        <Accordion.Item eventKey='0'>
          <Accordion.Header className=''>Genres</Accordion.Header>
          <Accordion.Body className='px-2'>
            <Row className='auto gap-1'>
              {Object.keys(filters.genre).map((g, i) => (
                <div className='field m-1' key={i}>
                  <input
                    className='form-check-input m-0 p-0'
                    type='checkbox'
                    id={i + 10}
                    value={g}
                    onChange={(e) => handleFieldChange(e)}
                    checked={filters.genre[g] === true}
                  />
                  <label htmlFor={i + 10}>{g}</label>
                </div>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header className=''>IMDb score</Accordion.Header>
          <Accordion.Body className='px-2'>
            <input
              type='range'
              className='form-range'
              min='0'
              max='8'
              value={filters.score}
              step='1'
              id='customRange3'
              onChange={(e) =>
                setFilters({ ...filters, score: e.target.value })
              }
            />
            <label htmlFor='customRange3' className='form-label'>
              {filters.score}+
            </label>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='2'>
          <Accordion.Header className=''>From age</Accordion.Header>
          <Accordion.Body className='px-2'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault1'
                value={3}
                onChange={(e) =>
                  setFilters({ ...filters, fromAge: e.target.value })
                }
              />
              <label className='form-check-label' htmlFor='flexRadioDefault1'>
                3+
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault2'
                value={6}
                onChange={(e) =>
                  setFilters({ ...filters, fromAge: e.target.value })
                }
              />
              <label className='form-check-label' htmlFor='flexRadioDefault2'>
                6+
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault3'
                value={12}
                onChange={(e) =>
                  setFilters({ ...filters, fromAge: e.target.value })
                }
              />
              <label className='form-check-label' htmlFor='flexRadioDefault3'>
                12+
              </label>
            </div>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id='flexRadioDefault4'
                value={16}
                onChange={(e) =>
                  setFilters({ ...filters, fromAge: e.target.value })
                }
              />
              <label className='form-check-label' htmlFor='flexRadioDefault4'>
                16+
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Filters;
