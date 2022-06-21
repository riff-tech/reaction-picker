import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import {
  useFilterValue,
  useOnGifClick,
  useGiphyAPIKey,
} from '../../PickerContext';
import './style.css';

const GifBrowser = () => {
  const filter = useFilterValue();
  const onGifClick = useOnGifClick();
  const giphyAPIKey = useGiphyAPIKey();
  const searchTerm = filter?.length ? filter[filter.length - 1].value : '';
  const gfRef = React.useRef();

  React.useEffect(() => {
    gfRef.current = new GiphyFetch(giphyAPIKey);
  }, [giphyAPIKey]);
  const fetchGifs = React.useCallback(
    offset =>
      searchTerm !== ''
        ? gfRef.current.search(searchTerm, { offset, limit: 10 })
        : gfRef.current.trending({ offset }),
    [searchTerm]
  );
  return (
    <div className="gif-scroll-wrapper scroll">
      <Grid
        onGifClick={gif => {
          onGifClick(gif.images.downsized.url || gif.images.original.url);
        }}
        hideAttribution
        noLink
        columns={2}
        width={238}
        gutter={8}
        fetchGifs={fetchGifs}
        key={searchTerm}
      />
    </div>
  );
};

export default GifBrowser;
