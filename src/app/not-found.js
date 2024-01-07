import Link from 'next/link';

const NotFound = () => {
  return (
    <section className='h-full grid items-center'>
      <div className='mx-auto max-w-screen-sm text-center grid gap-3'>
        <h1 className='text-7xl tracking-tight font-extrabold text-primary-600'>
          404
        </h1>
        <p className='text-3xl tracking-tight font-bold text-gray-900'>
          {`Something's missing.`}
        </p>
        <p className='text-lg font-light text-gray-500'>
          {`Sorry, we can't find that page. You'll find lots to explore on the
            home page.`}
        </p>
        <Link href='/dashboard'>Back to Home</Link>
      </div>
    </section>
  );
};

export default NotFound;
