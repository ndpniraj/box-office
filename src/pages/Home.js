import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setInput] = useState('');
  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const handleSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(response => response.json())
      .then(result => console.log(result));
  };

  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <MainPageLayout>
      <input onChange={onInputChange} value={input} onKeyDown={handleKeyDown} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
