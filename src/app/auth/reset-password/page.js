'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

import { useResetPasswordMutation } from '@/features/auth/authApiSlice';

YupPassword(Yup);

const resetPasswordValidationSchema = Yup.object({
  email: Yup.string().trim().email('Not valid').required('Required'),
  code: Yup.string().trim().required('Required'),
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

const ResetPassword = (props) => {
  const {
    searchParams: { email },
  } = props;
  const router = useRouter();

  const [
    resetPassword,
    { isLoading: resetPasswordIsLoading, isSuccess: resetPasswordIsSuccess },
  ] = useResetPasswordMutation();

  const resetPasswordFormik = useFormik({
    initialValues: {
      email,
      code: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      resetPassword(values)
        .unwrap()
        .then(() => {
          resetPasswordFormik.resetForm();
          toast.success('Password reset successfully');
          router.replace(`/auth/login?email=${values.email}`);
        })
        .catch((error) => {
          if (error.data?.msg) {
            toast.error(error.data.msg);
          } else {
            toast.error('Something went wrong!, please try again');
          }
        });
    },
  });

  return (
    <section className='h-full grid justify-center items-center'>
      <Card className='w-[350px] md:w-[450px]'>
        <CardHeader className='text-center'>
          <CardTitle>Reset Your Password</CardTitle>
        </CardHeader>
        <form noValidate onSubmit={resetPasswordFormik.handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='code'>Code</Label>
                <Input
                  id='code'
                  name='code'
                  placeholder='Enter your code'
                  value={resetPasswordFormik.values.code}
                  onBlur={resetPasswordFormik.handleBlur}
                  onChange={resetPasswordFormik.handleChange}
                />
                {!!resetPasswordFormik.touched.code &&
                  !!resetPasswordFormik.errors.code && (
                    <p className='text-red-700 text-sm'>
                      {resetPasswordFormik.errors.code}
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
                  value={resetPasswordFormik.values.password}
                  onBlur={resetPasswordFormik.handleBlur}
                  onChange={resetPasswordFormik.handleChange}
                />
                {!!resetPasswordFormik.touched.password &&
                  !!resetPasswordFormik.errors.password && (
                    <p className='text-red-700 text-sm'>
                      {resetPasswordFormik.errors.password}
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Button
              disabled={resetPasswordIsLoading || resetPasswordIsSuccess}
              type='submit'
            >
              {resetPasswordIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Reset Password
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
                href='./login'
                className='text-sm hover:underline underline-offset-4'
              >
                {`Go back to sign in`}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default ResetPassword;
