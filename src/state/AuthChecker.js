'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

import { checkLoginStatus } from '@/features/auth/authAction';
import { useFirstRender } from '@/hooks/optimization';

const AuthChecker = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { firstRender } = useFirstRender();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    firstRender && dispatch(checkLoginStatus());
  }, [dispatch, firstRender]);

  useEffect(() => {
    console.log(1, isLoggedIn)
    if (isLoggedIn === false && !isAuthPage) {
      console.log(2, isLoggedIn)
      router.replace('/auth/login');
    } else if (isLoggedIn && isAuthPage) {
      console.log(3, isLoggedIn)
      router.replace('/dashboard');
    }
  }, [isLoggedIn, router, isAuthPage]);

  return null;
};

export default AuthChecker;
