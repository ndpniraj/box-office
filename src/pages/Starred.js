import React, { useEffect, useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { getApi } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shows, setShows] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promisses = starred.map(showId => getApi(`/shows/${showId}`));
      Promise.all(promisses)
        .then(apiData => apiData.map(show => ({ show })))
        .then(result => {
          setShows(result);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [starred]);

  return (
    <MainPageLayout>
      {isLoading && <p>Shows are still loading</p>}
      {error && <p>{error}</p>}
      {!isLoading && !shows && <p>No shows were selected.</p>}
      {!isLoading && !error && shows && <ShowGrid data={shows} />}
    </MainPageLayout>
  );
};

export default Starred;
