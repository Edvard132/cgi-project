import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const Trailer = () => {
  const params = useParams();

  return (
    <div style={{ height: '90vh' }}>
      {params.trailerId != null ? (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${params.trailerId}`}
          controls={true}
          playing={true}
          width='100%'
          height='100%'
        />
      ) : (
        <div>No trailer found</div>
      )}
    </div>
  );
};

export default Trailer;
