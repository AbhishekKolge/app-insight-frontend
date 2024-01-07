'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Filter, AlertOctagon, Loader2 } from 'lucide-react';

import { useGetFreePaidCountQuery } from '@/features/analytics/analyticsApiSlice';

import { useNonQueryFilter } from '@/hooks/nonQueryFilter';

import CategorySelector from '../common/categorySelector';
import RatingFilter from '../filter/ratingFilter';
import ContentRatingSelector from '../common/contentRatingSelector';
import GenreSelector from '../common/genreSelector';
import InstallCountFilter from '../filter/installCountFilter';

const FreeVsPaidCount = () => {
  const seriesRef = useRef(null);
  const {
    queryFilterState,
    methods: {
      clearCategory,
      addCategory,
      clearAllFilters,
      addRatingHandler,
      addGenre,
      clearGenre,
      addContentRating,
      clearContentRating,
      addInstallCountHandler,
    },
  } = useNonQueryFilter();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetFreePaidCountQuery(queryFilterState);

  useLayoutEffect(() => {
    const root = am5.Root.new('freePaidCount');
    root.setThemes([am5themes_Animated.new(root)]);

    const pieChart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
        paddingBottom: 80,
      })
    );

    const series = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'count',
        categoryField: 'type',
      })
    );

    series.labels.template.setAll({
      fontSize: 10,
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });

    series.slices.template.set('tooltipText', '{category} ({value})');

    seriesRef.current = series;

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (data && isSuccess && seriesRef.current) {
      seriesRef.current.data.setAll(data);
    }
  }, [data, isSuccess]);

  const isFiltered =
    queryFilterState.categoryId.length ||
    queryFilterState.contentRatingId.length ||
    queryFilterState.genreId.length ||
    (queryFilterState.rating && queryFilterState.ratingOperator) ||
    (queryFilterState.installCount && queryFilterState.installCountOperator);

  return (
    <div className='px-4 py-2 h-full'>
      <p className='mb-2 text-sm font-medium'>Free VS Paid Apps</p>
      <div className='flex gap-2 flex-wrap items-center justify-end'>
        <Filter size={20} strokeWidth={1} />
        <CategorySelector
          onSelect={addCategory}
          selected={queryFilterState.categoryId}
          onClear={clearCategory}
        />
        <ContentRatingSelector
          onSelect={addContentRating}
          selected={queryFilterState.contentRatingId}
          onClear={clearContentRating}
        />
        <GenreSelector
          onSelect={addGenre}
          selected={queryFilterState.genreId}
          onClear={clearGenre}
        />
        <RatingFilter
          onAddRating={addRatingHandler}
          value={queryFilterState.rating}
          operator={queryFilterState.ratingOperator}
        />
        <InstallCountFilter
          onAddInstallCount={addInstallCountHandler}
          value={queryFilterState.installCount}
          operator={queryFilterState.installCountOperator}
        />
        {!!isFiltered && (
          <Button
            variant='rating'
            onClick={clearAllFilters}
            className='h-8 text-xs'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {(isLoading || isFetching) && (
        <h4 className='flex items-center gap-2 justify-center mt-10 scroll-m-20 text-xl font-semibold tracking-tight'>
          <Loader2 className='h-[50px] w-[50px] animate-spin' />
        </h4>
      )}
      {(isError || (isSuccess && !data?.length)) && (
        <h4 className='flex items-center gap-2 justify-center mt-10 text-red-600 scroll-m-20 text-xl font-semibold tracking-tight'>
          <AlertOctagon />
          No data found...
        </h4>
      )}

      <div className='w-full h-full' id='freePaidCount'></div>
    </div>
  );
};

export default FreeVsPaidCount;
