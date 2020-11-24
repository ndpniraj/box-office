/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import { InfoBlock, ShowPageWrapper } from '../components/show/Show.styled';
import ShowMainData from '../components/show/ShowMainData';
import { getApi } from '../misc/config';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { show: action.show, isLoading: false, error: null };
    case 'FETCH_FAILED':
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const Show = () => {
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: result });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    //   Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return <h1>Loading</h1>;

  if (error) return <p>error occor: {error}</p>;

  return (
    <ShowPageWrapper>
      <ShowMainData
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
        image={show.image}
      />
      <InfoBlock>
        <h2>Show Details</h2>
        <Details
          status={show.status}
          premiered={show.premiered}
          network={show.network}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
