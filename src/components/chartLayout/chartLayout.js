'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import AverageCategoryRating from '../charts/averageCategoryRating';
import CategoryTopDownloads from '../charts/categoryTopDownloads';
import TopExpensive from '../charts/topExpensive';
import TopAppsRating from '../charts/topAppsRating';
import TopReviewedApp from '../charts/topReviewedApp';
import ContentRatingAppCount from '../charts/contentRatingAppCount';
import FreeVsPaidCount from '../charts/freeVsPaidCount';
import TopCommentedApp from '../charts/topCommentedApp';
import RatingVsType from '../charts/ratingVsType';

import useMediaQuery from '@/hooks/mediaQuery';

const ChartLayout = () => {
  const isSmallScreen = useMediaQuery(900);

  return isSmallScreen ? (
    <div className='grid gap-6'>
      <div className='h-[400px] overflow-hidden'>
        <AverageCategoryRating />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <CategoryTopDownloads />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <TopExpensive />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <TopAppsRating />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <TopReviewedApp />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <ContentRatingAppCount />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <FreeVsPaidCount />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <TopCommentedApp />
      </div>
      <div className='h-[400px] overflow-hidden'>
        <RatingVsType />
      </div>
    </div>
  ) : (
    <ResizablePanelGroup
      direction='vertical'
      className='min-h-[2300px] rounded-lg border'
    >
      <ResizablePanel>
        <ResizablePanelGroup direction='horizontal' className='rounded-lg'>
          <ResizablePanel defaultSize={50}>
            <AverageCategoryRating />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <CategoryTopDownloads />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ResizablePanelGroup direction='horizontal' className='rounded-lg'>
          <ResizablePanel defaultSize={50}>
            <TopExpensive />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <TopAppsRating />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <TopReviewedApp />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ResizablePanelGroup direction='horizontal' className='rounded-lg'>
          <ResizablePanel defaultSize={45}>
            <ContentRatingAppCount />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55}>
            <FreeVsPaidCount />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <TopCommentedApp />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <RatingVsType />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ChartLayout;
