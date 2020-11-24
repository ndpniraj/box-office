import React from 'react';
import ShowCard from './ShowCard';

import NOT_FOUND_IMG from '../../image/not-found.png';
import { FlexGrid } from '../styled';
import { useShows } from '../../misc/custom-hooks';

const ShowGrid = ({ data }) => {
  const [shows, dispatch] = useShows();

  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStared = shows.includes(show.id);

        const onStarClick = () => {
          if (isStared) {
            dispatch({ type: 'REMOVE', showId: show.id });
          } else {
            dispatch({ type: 'ADD', showId: show.id });
          }
        };
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            image={show.image ? show.image.medium : NOT_FOUND_IMG}
            name={show.name}
            summary={show.summary}
            onStarClick={onStarClick}
            isStared={isStared}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
