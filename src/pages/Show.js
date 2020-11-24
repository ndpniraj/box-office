import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../misc/config';

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  console.log(show);
  useEffect(() => {
    getApi(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(result =>
      setShow(result)
    );
  }, [id]);
  return <div>Show</div>;
};

export default Show;
