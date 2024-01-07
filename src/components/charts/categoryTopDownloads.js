'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Filter, AlertOctagon, Loader2 } from 'lucide-react';

import { useGetCategoryTopDownloadsQuery } from '@/features/analytics/analyticsApiSlice';

import { useNonQueryFilter } from '@/hooks/nonQueryFilter';

import CategorySelector from '../common/categorySelector';
import InstallCountFilter from '../filter/installCountFilter';
import SortFilter from '../filter/sortFilter';

const INSTALL_COUNT_SORT_OPTION = {
  title: 'Install Count',
  key: 'installCount',
  sort: [
    {
      key: 'highest',
      title: 'Highest',
      type: 'asc',
      nullishSort: false,
    },
    {
      key: 'lowest',
      title: 'Lowest',
      type: 'desc',
      nullishSort: false,
    },
  ],
};

const CategoryTopDownloads = () => {
  const seriesRef = useRef(null);
  const xAxisRef = useRef(null);
  const {
    queryFilterState,
    methods: {
      clearCategory,
      addCategory,
      clearAllFilters,
      addInstallCountHandler,
      sortHandler,
    },
  } = useNonQueryFilter();

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetCategoryTopDownloadsQuery(queryFilterState);

  useLayoutEffect(() => {
    const root = am5.Root.new('topDownloadBar');
    root.setThemes([am5themes_Animated.new(root)]);

    root.numberFormatter.setAll({
      numberFormat: '#a',
      smallNumberThreshold: 0.001,
    });

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

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yRenderer = yAxis.get('renderer');
    yRenderer.grid.template.setAll({
      visible: false,
    });
    yRenderer.labels.template.setAll({
      fontSize: 8,
      location: 0.5,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    });
    xRenderer.labels.template.setAll({
      visible: false,
    });

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'installCount',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    series.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    series.columns.template.set('tooltipText', '{name} ({installCount})');

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
    (queryFilterState.installCount && queryFilterState.installCountOperator);

  return (
    <div className='px-4 py-2 h-full'>
      <p className='mb-2 text-sm font-medium'>
        Top Downloaded App Per Category
      </p>
      <div className='flex gap-2 flex-wrap items-center justify-end'>
        <Filter size={20} strokeWidth={1} />
        <CategorySelector
          onSelect={addCategory}
          selected={queryFilterState.categoryId}
          onClear={clearCategory}
        />

        <InstallCountFilter
          onAddInstallCount={addInstallCountHandler}
          value={queryFilterState.installCount}
          operator={queryFilterState.installCountOperator}
        />
        <SortFilter
          onSort={sortHandler}
          sortKey={queryFilterState.sortKey}
          sortType={queryFilterState.sortType}
          data={INSTALL_COUNT_SORT_OPTION}
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

      <div className='w-full h-full' id='topDownloadBar'></div>
    </div>
  );
};

export default CategoryTopDownloads;
