'use client';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import {
  StackIcon,
  StarIcon,
  DownloadIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import { TabletSmartphone, Ruler } from 'lucide-react';

import { useGetOverviewQuery } from '@/features/analytics/analyticsApiSlice';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fixedDecimals, formatNumber } from '@/utils/numberFormat';

const CARD_DATA = [
  {
    name: 'Total Categories',
    key: 'totalCategory',
  },
  {
    name: 'Total Apps',
    key: 'totalApps',
    icon: TabletSmartphone,
  },
  {
    name: 'Total Reviews',
    key: 'totalReview',
    icon: Pencil1Icon,
  },
  {
    name: 'Total Installs',
    key: 'installCount',
    icon: DownloadIcon,
  },
  {
    name: 'Average Rating',
    key: 'avgRating',
    icon: StarIcon,
  },
  {
    name: 'Average App Size (MB)',
    key: 'avgSize',
    icon: Ruler,
  },
  {
    name: 'Distinct Content Rating',
    key: 'totalContentRating',
    icon: StackIcon,
  },
  {
    name: 'Total Genre',
    key: 'totalGenre',
  },
];

const Overview = () => {
  const {
    data: overviewData,
    isLoading: overviewIsLoading,
    isFetching: overviewIsFetching,
    isSuccess: overviewIsSuccess,
    error: overviewError,
  } = useGetOverviewQuery({});

  useEffect(() => {
    if (overviewError) {
      if (overviewError.data?.msg) {
        toast.error(overviewError.data.msg);
      } else {
        toast.error('Something went wrong!, please try again');
      }
    }
  }, [overviewError, overviewIsSuccess]);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {overviewIsLoading &&
        new Array(8).fill(0).map((_, index) => {
          return <Skeleton key={index} className='h-[110px]' />;
        })}
      {overviewIsSuccess &&
        CARD_DATA.map((card) => {
          return (
            <Card key={card.key}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {card.name}
                </CardTitle>
                {card.icon && <card.icon size={18} />}
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {formatNumber(fixedDecimals(overviewData[card.key]))}
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default Overview;
