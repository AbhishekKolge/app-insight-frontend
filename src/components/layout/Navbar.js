'use client';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import NavAction from '../ui/nav-action';

import { logoutHandler } from '@/features/auth/authAction';
import { useLogoutMutation } from '@/features/auth/authApiSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const auth = useSelector((state) => state.auth);
  const isAuthPage = pathname.startsWith('/auth');
  const isRegisterPage = pathname.startsWith('/auth/sign-up');

  const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();

  const logoutAccountHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(logoutHandler());
      })
      .catch((error) => {
        if (error.data?.msg) {
          toast.error(error.data.msg);
        } else {
          toast.error('Something went wrong!, please try again');
        }
      });
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
          <NavAction
            auth={auth}
            onLogout={logoutAccountHandler}
            isLoggingOut={logoutIsLoading}
          />
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
