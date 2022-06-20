import PropTypes from 'prop-types';
import React from 'react';

import useFilter from '../../hooks/useFilter';
import { useConfig } from '../../PickerContext';

import './style.css';

function Search({ searchPlaceholder = null, emojiSearchRef }) {
  const config = useConfig();
  const onChange = useFilter();

  if (config.disableSearchBar) {
    return null;
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="search-icon" />
      <input
        placeholder={searchPlaceholder}
        className="emoji-search"
        onChange={onChange}
        autoFocus={!config.disableAutoFocus}
        ref={emojiSearchRef}
      />
    </div>
  );
}

export default Search;

Search.propTypes = {
  searchPlaceholder: PropTypes.string,
  emojiSearchRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
