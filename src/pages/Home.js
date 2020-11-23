import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { getApi } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowsSelected = searchOption === 'shows';

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const handleSearch = () => {
    getApi(`/search/${searchOption}?q=${input}`).then(result => {
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
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }

    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  return (
    <MainPageLayout>
      <input onChange={onInputChange} value={input} onKeyDown={handleKeyDown} />
      <div>
        <label htmlFor="select-shows">
          <input
            type="radio"
            id="select-shows"
            value="shows"
            checked={isShowsSelected}
            onChange={onRadioChange}
          />
          Shows
        </label>
        <label htmlFor="select-person">
          <input
            type="radio"
            id="select-person"
            value="people"
            checked={!isShowsSelected}
            onChange={onRadioChange}
          />
          Actors
        </label>
      </div>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
