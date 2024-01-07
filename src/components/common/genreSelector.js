'use client';
import { useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import _ from 'lodash';

import { ComboBoxPopover } from '@/components/ui/combo-box';

import { useLazyGetAllGenresQuery } from '@/features/common/commonApiSlice';
import { useInfiniteScrollFilter } from '@/hooks/infiniteScrollFilter';

const GenreSelector = (props) => {
  const { onSelect, selected, onClear } = props;
  const [
    getAllGenres,
    { isLoading: genreIsLoading, isFetching: genreIsFetching },
  ] = useLazyGetAllGenresQuery();

  const {
    filterState: genreFilterState,
    state: genreState,
    dispatchState: dispatchGenreState,
    nextPageHandler: nextGenrePageHandler,
    searchHandler: searchGenreHandler,
    resetFilterHandler: resetGenreFilterHandler,
  } = useInfiniteScrollFilter({ fetch: getAllGenres });

  useEffect(() => {
    if (genreState.initialFetch) {
      getAllGenres({}, true)
        .unwrap()
        .then((data) => {
          dispatchGenreState({
            type: 'SET_DATA',
            data: data.results,
            totalPages: data.totalPages,
          });
        })
        .catch((error) => {
          if (error.data?.msg) {
            toast.error(error.data.msg);
          } else {
            toast.error('Something went wrong!, please try again');
          }
        });
    }
  }, [genreState, getAllGenres, dispatchGenreState]);

  return (
    <ComboBoxPopover
      data={genreState.data}
      isLoading={genreIsLoading || genreIsFetching}
      onSearch={searchGenreHandler}
      value={genreFilterState.search}
      reset={resetGenreFilterHandler}
      onLoadMore={nextGenrePageHandler}
      onSelect={onSelect}
      selected={selected}
      onClear={onClear}
      placeholder='Genre'
    />
  );
};

export default GenreSelector;
