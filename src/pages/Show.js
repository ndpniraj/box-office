import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        setTimeout(() => {
          if (isMounted) {
            setShow(result);
            setIsLoading(false);
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    //   Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) return <h1>Loading</h1>;

  if (error) return <p>error occor: {error}</p>;

  return <p>{JSON.stringify(show)}</p>;
};

export default Show;
