import { useEffect, useReducer, useState } from 'react';
import { getApi } from './config';

// custom hook to add and remove starred show inside the LocalStorage
const showReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD':
      return [...prevState, action.showId];
    case 'REMOVE':
      return prevState.filter(showId => showId !== action.showId);
    default:
      return prevState;
  }
};

const usePersistedReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};

export const useShows = (key = 'shows') => {
  return usePersistedReducer(showReducer, [], key);
};

// custom hook to persist user input data to session storage
export const useLastQuery = (key = 'lastQuery') => {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
};

// custom hook to fetch single shows from api by their id.
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

export const useShow = showId => {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    getApi(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
};
