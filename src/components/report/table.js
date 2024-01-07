'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';

import { useGetReportQuery } from '@/features/report/reportApiSlice';
import { useFilter } from '@/hooks/filter';

const Table = () => {
  const {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      sortHandler,
      searchHandler,
      clearCategory,
      clearGenre,
      clearContentRating,
      addCategory,
      addGenre,
      addContentRating,
      clearAllFilters,
      setTypeHandler,
      clearTypeHandler,
    },
  } = useFilter();
  const {
    data: reportData,
    isLoading: reportIsLoading,
    isFetching: reportIsFetching,
    error: reportError,
    isSuccess: reportIsSuccess,
  } = useGetReportQuery(queryFilterState, {
    skip: helperState.firstRender,
  });

  useEffect(() => {
    if (reportError) {
      if (reportError?.data?.msg) {
        toast.error(reportError.data.msg);
      } else {
        toast.error('Something went wrong!, please try again');
      }
    }
  }, [reportError, reportIsSuccess]);

  const data = reportData?.results || [];
  const totalPages = reportData?.totalPages;

  return (
    <div className='h-full block overflow-x-scroll flex-1 flex-col space-y-8 mt-6 md:flex'>
      <DataTable
        isLoading={
          reportIsLoading || reportIsFetching || helperState.firstRender
        }
        onNext={nextPageHandler}
        onPrev={prevPageHandler}
        totalPages={totalPages}
        currentPage={queryFilterState.page}
        data={data}
        columns={columns}
        onSort={sortHandler}
        sortKey={queryFilterState.sortKey}
        sortType={queryFilterState.sortType}
        onSearch={searchHandler}
        searchValue={helperState.search}
        clearCategory={clearCategory}
        clearGenre={clearGenre}
        clearContentRating={clearContentRating}
        addCategory={addCategory}
        addGenre={addGenre}
        addContentRating={addContentRating}
        clearAllFilters={clearAllFilters}
        categoryId={queryFilterState.categoryId}
        genreId={queryFilterState.genreId}
        contentRatingId={queryFilterState.contentRatingId}
        setTypeHandler={setTypeHandler}
        clearTypeHandler={clearTypeHandler}
        type={queryFilterState.type}
      />
    </div>
  );
};

export default Table;
