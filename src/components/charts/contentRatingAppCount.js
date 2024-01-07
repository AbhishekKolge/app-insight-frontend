'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Filter, AlertOctagon, Loader2 } from 'lucide-react';

import { useGetContentRatingAppCountQuery } from '@/features/analytics/analyticsApiSlice';

import { useNonQueryFilter } from '@/hooks/nonQueryFilter';

import CategorySelector from '../common/categorySelector';
import ContentRatingSelector from '../common/contentRatingSelector';
import GenreSelector from '../common/genreSelector';
import TypeSelector from '../common/typeSelector';
import RatingFilter from '../filter/ratingFilter';
import InstallCountFilter from '../filter/installCountFilter';

const ContentRatingAppCount = () => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);
  const {
    queryFilterState,
    methods: {
      clearCategory,
      addCategory,
      clearAllFilters,
      addContentRating,
      clearContentRating,
      addGenre,
      clearGenre,
      setTypeHandler,
      clearTypeHandler,
      addRatingHandler,
      addInstallCountHandler,
    },
  } = useNonQueryFilter();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetContentRatingAppCountQuery(queryFilterState);

  useLayoutEffect(() => {
    const root = am5.Root.new('contentRatingAppCount');
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 130,
        layout: root.verticalLayout,
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'contentRating',
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    });
    xRenderer.labels.template.setAll({
      visible: true,
      fontSize: 8,
    });

    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    });
    yRenderer.labels.template.setAll({
      visible: false,
    });

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: 'count',
        categoryYField: 'contentRating',
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // series.columns.template.adapters.add('fill', function (fill, target) {
    //   return chart.get('colors').getIndex(series.columns.indexOf(target));
    // });

    // series.columns.template.adapters.add('stroke', function (stroke, target) {
    //   return chart.get('colors').getIndex(series.columns.indexOf(target));
    // });

    series.columns.template.set('tooltipText', '{contentRating} ({count})');

    const cursor = chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        behavior: 'none',
      })
    );
    cursor.lineY.set('visible', false);

    yAxis.set(
      'tooltip',
      am5.Tooltip.new(root, {
        forceHidden: true,
      })
    );

    seriesRef.current = series;
    xAxisRef.current = yAxis;

    series.appear();
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (data && isSuccess && seriesRef.current && xAxisRef.current) {
      seriesRef.current.data.setAll(data);
      xAxisRef.current.data.setAll(data);
    }
  }, [data, isSuccess]);

  const isFiltered =
    queryFilterState.categoryId.length ||
    queryFilterState.contentRatingId.length ||
    queryFilterState.genreId.length ||
    queryFilterState.type.length ||
    (queryFilterState.rating && queryFilterState.ratingOperator) ||
    (queryFilterState.installCount && queryFilterState.installCountOperator);

  return (
    <div className='px-4 py-2 h-full'>
      <p className='mb-2 text-sm font-medium'>Total Apps Per Content Rating</p>
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
        <TypeSelector
          setTypeHandler={setTypeHandler}
          clearTypeHandler={clearTypeHandler}
          type={queryFilterState.type}
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

      <div className='w-full h-full' id='contentRatingAppCount'></div>
    </div>
  );
};

export default ContentRatingAppCount;
