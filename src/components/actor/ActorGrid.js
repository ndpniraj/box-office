import React from 'react';
import ActorCard from './ActorCard';

import NOT_FOUND_IMG from '../../image/not-found.png';

const ActorGrid = ({ data }) => {
  return data.map(({ person }) => (
    <ActorCard
      key={person.id}
      image={person.image ? person.image.medium : NOT_FOUND_IMG}
      name={person.name}
      gender={person.gender}
      country={person.country ? person.country.name : null}
      birthday={person.birthday}
      deathday={person.deathday}
    />
  ));
};

export default ActorGrid;
