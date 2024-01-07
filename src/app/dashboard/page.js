import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Table from '@/components/report/table';
import Overview from '@/components/analytics/overview';
import ChartLayout from '@/components/chartLayout/chartLayout';

const Dashboard = () => {
  return (
    <section className='h-full grid'>
      <Tabs defaultValue='analytics' className='w-full overflow-hidden'>
        <TabsList className='grid w-full md:w-[300px] grid-cols-2'>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='report'>Report</TabsTrigger>
        </TabsList>
        <TabsContent value='analytics' className='grid gap-10'>
          <Overview />
          <ChartLayout />
        </TabsContent>
        <TabsContent value='report'>
          <Table />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Dashboard;
