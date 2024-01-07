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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useVerifyMutation } from '@/features/auth/authApiSlice';

const verifyValidationSchema = Yup.object({
  email: Yup.string().trim().email('Not valid').required('Required'),
  code: Yup.string().trim().required('Required'),
});

const Verify = (props) => {
  const {
    searchParams: { email },
  } = props;
  const router = useRouter();

  const [verify, { isLoading: verifyIsLoading, isSuccess: verifyIsSuccess }] =
    useVerifyMutation();

  const verifyFormik = useFormik({
    initialValues: {
      email,
      code: '',
    },
    enableReinitialize: true,
    validationSchema: verifyValidationSchema,
    onSubmit: (values) => {
      verify(values)
        .unwrap()
        .then(() => {
          verifyFormik.resetForm();
          toast.success('Verified successfully');
          router.replace(`/auth/login?email=${values.email}`);
        })
        .catch((error) => {
          if (error.status === 409) {
            router.replace(`/auth/login?email=${values.email}`);
            verifyFormik.resetForm();
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
          <CardTitle>Verify Email</CardTitle>
        </CardHeader>
        <form noValidate onSubmit={verifyFormik.handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='code'>Code</Label>
                <Input
                  id='code'
                  name='code'
                  placeholder='Enter your code'
                  value={verifyFormik.values.code}
                  onBlur={verifyFormik.handleBlur}
                  onChange={verifyFormik.handleChange}
                />
                {!!verifyFormik.touched.code && !!verifyFormik.errors.code && (
                  <p className='text-red-700 text-sm'>
                    {verifyFormik.errors.code}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Button disabled={verifyIsLoading || verifyIsSuccess} type='submit'>
              {verifyIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Verify
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

export default Verify;
