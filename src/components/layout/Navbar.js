'use client';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import NavAction from '../ui/nav-action';

import { logoutHandler } from '@/features/auth/authAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const auth = useSelector((state) => state.auth);
  const isAuthPage = pathname.startsWith('/auth');
  const isRegisterPage = pathname.startsWith('/auth/sign-up');

  const logoutAccountHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <nav className='w-full fixed top-0 inset-x-0 z-10 flex justify-between items-center bg-white'>
      <h1 className='text-2xl md:text-4xl'>
        <Link href='/dashboard'>App Insight</Link>
      </h1>
      <div>
        {auth.isLoggedIn === null &&
          (isAuthPage ? (
            <Skeleton className='h-8 w-[100px]' />
          ) : (
            <Skeleton className='h-[50px] w-[50px] rounded-full' />
          ))}
        {auth.isLoggedIn ? (
          <NavAction auth={auth} onLogout={logoutAccountHandler} />
        ) : (
          auth.isLoggedIn === false && (
            <Button variant='primary' asChild>
              {isRegisterPage ? (
                <Link href='/auth/login'>Login</Link>
              ) : (
                <Link href='/auth/sign-up'>Register</Link>
              )}
            </Button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
