import { useEffect, useReducer } from 'react';

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
