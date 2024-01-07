'use client';
import { Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Error = (props) => {
  const { error } = props;
  const router = useRouter();

  const onRefresh = () => {
    router.refresh();
  };

  return (
    <section className='h-full grid items-center'>
      <div className='mx-auto max-w-screen-sm text-center grid gap-3'>
        <Ban className='m-auto w-[100px] h-[100px] text-red-500' />

        <p className='text-3xl tracking-tight font-bold text-gray-900'>
          {error?.message || `Something's went wrong`}
        </p>
        <p className='text-lg font-light text-gray-500'>
          {`Sorry, we couldn't fetch the data. You'll find lots to explore on the
            home page or you can retry fetching the data.`}
        </p>
        <Button onClick={onRefresh}>Retry</Button>
      </div>
    </section>
  );
};

export default Error;
