'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
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

import { useForgotPasswordMutation } from '@/features/auth/authApiSlice';

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().trim().email('Not valid').required('Required'),
});

const ForgotPassword = () => {
  const router = useRouter();

  const [
    forgotPassword,
    { isLoading: forgotPasswordIsLoading, isSuccess: forgotPasswordIsSuccess },
  ] = useForgotPasswordMutation();

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      forgotPassword(values)
        .unwrap()
        .then(() => {
          forgotPasswordFormik.resetForm();
          toast.success('Reset code sent successfully');
          router.push(`/auth/reset-password?email=${values.email}`);
        })
        .catch((error) => {
          if (error.status === 409) {
            router.push(`/auth/reset-password?email=${values.email}`);
            forgotPasswordFormik.resetForm();
          }
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
          <CardDescription>
            Enter your email address and we will send you a password reset code.
          </CardDescription>
        </CardHeader>
        <form noValidate onSubmit={forgotPasswordFormik.handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={forgotPasswordFormik.values.email}
                  onBlur={forgotPasswordFormik.handleBlur}
                  onChange={forgotPasswordFormik.handleChange}
                />
                {!!forgotPasswordFormik.touched.email &&
                  !!forgotPasswordFormik.errors.email && (
                    <p className='text-red-700 text-sm'>
                      {forgotPasswordFormik.errors.email}
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Button
              disabled={forgotPasswordIsLoading || forgotPasswordIsSuccess}
              type='submit'
            >
              {forgotPasswordIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Get Reset Code
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

export default ForgotPassword;
