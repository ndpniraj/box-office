import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getApi } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const handleSearch = () => {
    getApi(`/search/shows?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const handleKeyDown = ev => {
    if (ev.keyCode === 13) {
      handleSearch();
    }
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results found!</div>;
    }

    if (results && results.length > 0) {
      return results.map(item => (
        <div key={item.show.id}>{item.show.name}</div>
      ));
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input onChange={onInputChange} value={input} onKeyDown={handleKeyDown} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
