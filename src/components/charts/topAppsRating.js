'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Filter, AlertOctagon, Loader2 } from 'lucide-react';

import { useGetTopAppsRatingQuery } from '@/features/analytics/analyticsApiSlice';

import { useNonQueryFilter } from '@/hooks/nonQueryFilter';

import CategorySelector from '../common/categorySelector';
import TypeSelector from '../common/typeSelector';
import ContentRatingSelector from '../common/contentRatingSelector';

const TopAppsRating = () => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);
  const {
    queryFilterState,
    methods: {
      clearCategory,
      addCategory,
      clearAllFilters,
      setTypeHandler,
      clearTypeHandler,
      addContentRating,
      clearContentRating,
    },
  } = useNonQueryFilter();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetTopAppsRatingQuery(queryFilterState);

  useLayoutEffect(() => {
    const root = am5.Root.new('topAppsRating');
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 20,
        paddingBottom: 80,
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'name',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    });
    xRenderer.labels.template.setAll({
      visible: false,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    });
    yRenderer.labels.template.setAll({
      fontSize: 12,
      location: 0.5,
    });

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'rating',
        categoryXField: 'name',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.bullets.push(function () {
      let bulletCircle = am5.Circle.new(root, {
        radius: 5,
        fill: series.get('fill'),
      });
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

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
    xAxisRef.current = xAxis;

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
    queryFilterState.type.length ||
    queryFilterState.contentRatingId.length;

  return (
    <div className='px-4 py-2 h-full'>
      <p className='mb-2 text-sm font-medium'>Top 10 Downloaded App Rating</p>
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
        <TypeSelector
          setTypeHandler={setTypeHandler}
          clearTypeHandler={clearTypeHandler}
          type={queryFilterState.type}
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
      <div className='w-full h-full' id='topAppsRating'></div>
    </div>
  );
};

export default TopAppsRating;
