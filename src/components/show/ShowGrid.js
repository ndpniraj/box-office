import React from 'react';
import ShowCard from './ShowCard';

import NOT_FOUND_IMG from '../../image/not-found.png';

const ShowGrid = ({ data }) => {
  return data.map(({ show }) => (
    <ShowCard
      key={show.id}
      id={show.id}
      image={show.image ? show.image.medium : NOT_FOUND_IMG}
      name={show.name}
      summary={show.summary}
    />
  ));
};

export default ShowGrid;
