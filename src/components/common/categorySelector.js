'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import _ from 'lodash';

import { ComboBoxPopover } from '@/components/ui/combo-box';

import { useLazyGetAllCategoriesQuery } from '@/features/common/commonApiSlice';
import { useInfiniteScrollFilter } from '@/hooks/infiniteScrollFilter';

const CategorySelector = (props) => {
  const { onSelect, selected, onClear } = props;
  const [
    getAllCategories,
    { isLoading: categoryIsLoading, isFetching: categoryIsFetching },
  ] = useLazyGetAllCategoriesQuery();

  const {
    filterState: categoryFilterState,
    state: categoryState,
    dispatchState: dispatchCategoryState,
    nextPageHandler: nextCategoryPageHandler,
    searchHandler: searchCategoryHandler,
    resetFilterHandler: resetCategoryFilterHandler,
  } = useInfiniteScrollFilter({ fetch: getAllCategories });

  useEffect(() => {
    if (categoryState.initialFetch) {
      getAllCategories({}, true)
        .unwrap()
        .then((data) => {
          dispatchCategoryState({
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
  }, [categoryState, getAllCategories, dispatchCategoryState]);

  return (
    <ComboBoxPopover
      data={categoryState.data}
      isLoading={categoryIsLoading || categoryIsFetching}
      onSearch={searchCategoryHandler}
      value={categoryFilterState.search}
      reset={resetCategoryFilterHandler}
      onLoadMore={nextCategoryPageHandler}
      onSelect={onSelect}
      selected={selected}
      onClear={onClear}
      placeholder='Category'
    />
  );
};

export default CategorySelector;
