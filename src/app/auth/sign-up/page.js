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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useRegisterMutation } from '@/features/auth/authApiSlice';

YupPassword(Yup);

const signUpValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(20, 'Too long')
    .min(3, 'Too short')
    .required('Required'),
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

const SignUp = () => {
  const router = useRouter();
  const [
    register,
    { isLoading: registerIsLoading, isSuccess: registerIsSuccess },
  ] = useRegisterMutation();

  const signUpFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      register(values)
        .unwrap()
        .then(() => {
          signUpFormik.resetForm();
          toast.success('Registered successfully');
          router.push(`/auth/verify?email=${values.email}`);
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
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>App analytics for free</CardDescription>
        </CardHeader>
        <form noValidate onSubmit={signUpFormik.handleSubmit}>
          <CardContent>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Name</Label>
                <Input
                  id='name'
                  name='name'
                  placeholder='Enter your name'
                  value={signUpFormik.values.name}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                />
                {!!signUpFormik.touched.name && !!signUpFormik.errors.name && (
                  <p className='text-red-700 text-sm'>
                    {signUpFormik.errors.name}
                  </p>
                )}
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  value={signUpFormik.values.email}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                />
                {!!signUpFormik.touched.email &&
                  !!signUpFormik.errors.email && (
                    <p className='text-red-700 text-sm'>
                      {signUpFormik.errors.email}
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
                  value={signUpFormik.values.password}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                />
                {!!signUpFormik.touched.password &&
                  !!signUpFormik.errors.password && (
                    <p className='text-red-700 text-sm'>
                      {signUpFormik.errors.password}
                    </p>
                  )}
              </div>
            </div>
          </CardContent>
          <CardFooter className='grid gap-4'>
            <Button
              disabled={registerIsLoading || registerIsSuccess}
              type='submit'
            >
              {registerIsLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Register
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
                {`Already have an account?`}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SignUp;
