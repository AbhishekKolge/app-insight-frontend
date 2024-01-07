'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import _ from 'lodash';

import { ComboBoxPopover } from '@/components/ui/combo-box';

import { useLazyGetAllContentRatingsQuery } from '@/features/common/commonApiSlice';
import { useInfiniteScrollFilter } from '@/hooks/infiniteScrollFilter';

const ContentRatingSelector = (props) => {
  const { onSelect, selected, onClear } = props;
  const [
    getAllContentRatings,
    { isLoading: contentRatingIsLoading, isFetching: contentRatingIsFetching },
  ] = useLazyGetAllContentRatingsQuery();

  const {
    filterState: contentRatingFilterState,
    state: contentRatingState,
    dispatchState: dispatchContentRatingState,
    nextPageHandler: nextContentRatingPageHandler,
    searchHandler: searchContentRatingHandler,
    resetFilterHandler: resetContentRatingFilterHandler,
  } = useInfiniteScrollFilter({ fetch: getAllContentRatings });

  useEffect(() => {
    if (contentRatingState.initialFetch) {
      getAllContentRatings({}, true)
        .unwrap()
        .then((data) => {
          dispatchContentRatingState({
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
  }, [contentRatingState, getAllContentRatings, dispatchContentRatingState]);

  return (
    <ComboBoxPopover
      data={contentRatingState.data}
      isLoading={contentRatingIsLoading || contentRatingIsFetching}
      onSearch={searchContentRatingHandler}
      value={contentRatingFilterState.search}
      reset={resetContentRatingFilterHandler}
      onLoadMore={nextContentRatingPageHandler}
      onSelect={onSelect}
      selected={selected}
      onClear={onClear}
      placeholder='Content Rating'
    />
  );
};

export default ContentRatingSelector;
