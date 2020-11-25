import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import ActorGrid from '../components/actor/ActorGrid';
import ShowGrid from '../components/show/ShowGrid';
import { getApi } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';
import CustomRadio from '../components/CustomRadio';

const Home = () => {
  const [input, setInput] = useLastQuery();
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }

    return null;
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  return (
    <MainPageLayout>
      <SearchInput
        onChange={onInputChange}
        value={input}
        onKeyDown={handleKeyDown}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="select-shows"
            value="shows"
            checked={isShowsSelected}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="select-person"
            value="people"
            checked={!isShowsSelected}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
