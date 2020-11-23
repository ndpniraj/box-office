import React from 'react';
import ShowCard from './ShowCard';

import NOT_FOUND_IMG from '../../image/not-found.png';
import { FlexGrid } from '../styled';

const ShowGrid = ({ data }) => {
  return (
    <FlexGrid>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          image={show.image ? show.image.medium : NOT_FOUND_IMG}
          name={show.name}
          summary={show.summary}
        />
      ))}
    </FlexGrid>
  );
};

export default ShowGrid;
