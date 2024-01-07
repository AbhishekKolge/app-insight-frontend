'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useLoginMutation } from '@/features/auth/authApiSlice';
import { loginHandler } from '@/features/auth/authAction';

YupPassword(Yup);

const loginValidationSchema = Yup.object({
  email: Yup.string().trim().email('Not valid').required('Required'),
  password: Yup.string()
    .trim()
    .password()
    .min(8, 'Must be minimum 8 characters')
    .minLowercase(1, 'Must include 1 lowercase letter')
    .minUppercase(1, 'Must include 1 uppercase letter')
    .minSymbols(1, 'Must include 1 special letter')
    .minNumbers(1, 'Must include 1 number letter')
    .required('Required'),
});

const Login = (props) => {
  const {
    searchParams: { email },
  } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading: loginIsLoading, isSuccess: loginIsSuccess }] =
    useLoginMutation();

  const loginFormik = useFormik({
    initialValues: {
      email: email || '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      login(values)
        .unwrap()
        .then((data) => {
          loginFormik.resetForm();
          dispatch(loginHandler(data));
        })
        .catch((error) => {
          if (error.status === 403) {
            router.push(`/auth/verify?email=${values.email}`);
            loginFormik.resetForm();
          }
          if (error.data?.msg) {
            toast.error(error.data.msg);
          } else {
            toast.error('Something went wrong!, please try again');
          }
        });
    },
  });

  const setTestCredentialsHandler = async () => {
    await loginFormik.setFieldValue('email', process.env.EMAIL);
    await loginFormik.setFieldValue('password', process.env.PASSWORD);
  };

  return (
    <section className='h-full grid justify-center items-center'>
      <Card className='w-[350px] md:w-[450px]'>
        <CardHeader className='text-center'>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>App analytics for free</CardDescription>
        </CardHeader>
        <form noValidate onSubmit={loginFormik.handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={loginFormik.values.email}
                  onBlur={loginFormik.handleBlur}
                  onChange={loginFormik.handleChange}
                />
                {!!loginFormik.touched.email && !!loginFormik.errors.email && (
                  <p className='text-red-700 text-sm'>
                    {loginFormik.errors.email}
                  </p>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  value={loginFormik.values.password}
                  onBlur={loginFormik.handleBlur}
                  onChange={loginFormik.handleChange}
                />
                {!!loginFormik.touched.password &&
                  !!loginFormik.errors.password && (
                    <p className='text-red-700 text-sm'>
                      {loginFormik.errors.password}
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Button type='submit' disabled={loginIsLoading || loginIsSuccess}>
              {loginIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Sign In
            </Button>
            <Button
              type='button'
              variant='outline'
              onClick={setTestCredentialsHandler}
              disabled={loginIsLoading || loginIsSuccess}
            >
              {loginIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Set Test Cred
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or
                </span>
              </div>
            </div>
            <div className='text-center flex flex-col space-y-3'>
              <Link
                href='./sign-up'
                className='text-sm hover:underline underline-offset-4'
              >
                {`Don't have an account?`}
              </Link>
              <Link
                href='./forgot-password'
                className='text-sm hover:underline underline-offset-4'
              >
                {`Forgot password?`}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default Login;
