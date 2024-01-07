'use client';
import { useRef, useLayoutEffect, useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Filter, AlertOctagon, Loader2 } from 'lucide-react';

import { useGetTopCommentedAppQuery } from '@/features/analytics/analyticsApiSlice';

import { useNonQueryFilter } from '@/hooks/nonQueryFilter';

import CategorySelector from '../common/categorySelector';
import ContentRatingSelector from '../common/contentRatingSelector';
import GenreSelector from '../common/genreSelector';
import TypeSelector from '../common/typeSelector';
import RatingFilter from '../filter/ratingFilter';
import InstallCountFilter from '../filter/installCountFilter';

const TopCommentedApp = () => {
  const seriesRef = useRef([]);
  const yAxisRef = useRef(null);
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
    useGetTopCommentedAppQuery(queryFilterState);

  useLayoutEffect(() => {
    const root = am5.Root.new('TopCommentedApp');
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
        paddingBottom: 80,
        layout: root.horizontalLayout,
        arrangeTooltips: false,
      })
    );

    root.numberFormatter.set('numberFormat', "#.#s'%");

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'name',
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: true,
          cellStartLocation: 0.1,
          cellEndLocation: 0.9,
          minorGridEnabled: true,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        calculateTotals: true,
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    const yRenderer = yAxis.get('renderer');
    yRenderer.axisFills.template.setAll({
      fill: am5.color(0x000000),
      fillOpacity: 0.05,
      visible: true,
    });

    yRenderer.grid.template.setAll({
      visible: false,
    });
    yRenderer.labels.template.setAll({
      visible: false,
    });

    const xRenderer = xAxis.get('renderer');
    xRenderer.grid.template.setAll({
      visible: false,
    });
    xRenderer.labels.template.setAll({
      visible: false,
    });

    const createSeries = (field, name, color) => {
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          name: name,
          valueXField: field,
          categoryYField: 'name',
          sequencedInterpolation: true,
          stacked: true,
          fill: color,
          stroke: color,
          calculateAggregates: true,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      series.columns.template.setAll({
        height: am5.p100,
      });

      series.bullets.push(function (root, series) {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 0.5,
          sprite: am5.Label.new(root, {
            fill: am5.color(0xffffff),
            centerX: am5.p50,
            centerY: am5.p50,
            text: '{valueX}',
            populateText: true,
            oversizedBehavior: 'hide',
          }),
        });
      });

      series.columns.template.set('tooltipText', '{name} ({valueX})');

      series.appear();

      seriesRef.current.push(series);

      return series;
    };

    let positiveColor = root.interfaceColors.get('positive');
    let negativeColor = root.interfaceColors.get('negative');

    createSeries(
      'negativePercentage',
      'Negative',
      am5.Color.lighten(negativeColor, 0.3)
    );
    createSeries(
      'neutralPercentage',
      'Neutral',
      am5.Color.lighten(positiveColor, 0.5)
    );
    createSeries('positivePercentage', 'Positive', positiveColor);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerY: am5.p50,
        y: am5.p50,
        layout: root.verticalLayout,
        marginLeft: 50,
      })
    );

    legend.data.setAll(chart.series.values);

    yAxisRef.current = yAxis;

    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  useEffect(() => {
    if (data && isSuccess && seriesRef.current && yAxisRef.current) {
      seriesRef.current.forEach((series) => {
        series.data.setAll(data);
      });
      yAxisRef.current.data.setAll(data);
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
      <p className='mb-2 text-sm font-medium'>Top Commented Apps</p>
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

      <div className='w-full h-full' id='TopCommentedApp'></div>
    </div>
  );
};

export default TopCommentedApp;
