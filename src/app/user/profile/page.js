'use client';
import { Loader2 } from 'lucide-react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';
import ProfileCardLoading from '@/components/user/ProfileCardLoading';
import ProfileImage from '@/components/user/ProfileImage';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  useShowMeQuery,
  useRemoveProfileImageMutation,
  useUploadProfileImageMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
} from '@/features/user/userApiSlice';
import {
  updateUserInfoHandler,
  logoutHandler,
} from '@/features/auth/authAction';

const profileValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .max(20, 'Too long')
    .min(3, 'Too short')
    .required('Required'),
  dob: Yup.date().nullable(true).optional(),
});

const Profile = () => {
  const dispatch = useDispatch();
  const {
    data: showMeData,
    isLoading: showMeIsLoading,
    error: showMeError,
    isSuccess: showMeIsSuccess,
  } = useShowMeQuery({});
  const [removeProfileImage, { isLoading: removeProfileImageIsLoading }] =
    useRemoveProfileImageMutation();
  const [uploadProfileImage, { isLoading: uploadProfileImageIsLoading }] =
    useUploadProfileImageMutation();
  const [updateProfile, { isLoading: updateProfileIsLoading }] =
    useUpdateProfileMutation();
  const [deleteAccount, { isLoading: deleteAccountIsLoading }] =
    useDeleteAccountMutation();

  const profileFormik = useFormik({
    initialValues: {
      name: showMeData?.user?.name || '',
      dob: showMeData?.user?.dob || null,
    },
    enableReinitialize: true,
    validationSchema: profileValidationSchema,
    onSubmit: (values) => {
      updateProfile(values)
        .unwrap()
        .then(() => {
          dispatch(updateUserInfoHandler({ name: values.name }));
          toast.success('Profile updated successfully');
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

  const dobHandler = (value) => {
    value
      ? profileFormik.setFieldValue('dob', value)
      : profileFormik.setFieldValue('dob', null);
  };

  const deleteAccountHandler = () => {
    deleteAccount()
      .unwrap()
      .then(() => {
        dispatch(logoutHandler({ isSession: true }));
        toast.success('Account deleted successfully');
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
    <section className='h-full grid justify-center items-center'>
      {showMeIsLoading && <ProfileCardLoading />}
      {showMeIsSuccess && (
        <Card className='w-[350px] md:w-[450px]'>
          <CardHeader>
            <CardTitle className='flex items-center justify-between mb-4'>
              My Profile
              <span className='flex items-center gap-2'>
                <Badge className='bg-green-600 hover:bg-green-600 capitalize'>
                  {showMeData?.user?.isVerified ? 'verified' : 'not verified'}
                </Badge>
              </span>
            </CardTitle>
            <ProfileImage
              isLoading={
                removeProfileImageIsLoading || uploadProfileImageIsLoading
              }
              onUpload={uploadProfileImage}
              onCancel={removeProfileImage}
              showMeData={showMeData}
              profileImageId={showMeData?.user?.profileImageId}
            />
          </CardHeader>
          <form noValidate onSubmit={profileFormik.handleSubmit}>
            <CardContent>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Name</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Enter your name'
                    value={profileFormik.values.name}
                    onBlur={profileFormik.handleBlur}
                    onChange={profileFormik.handleChange}
                  />
                  {!!profileFormik.touched.name &&
                    !!profileFormik.errors.name && (
                      <p className='text-red-700 text-sm'>
                        {profileFormik.errors.name}
                      </p>
                    )}
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='dob'>Date of birth</Label>
                  <Popover id='dob'>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-start text-left font-normal',
                          !profileFormik.values.dob && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {profileFormik.values.dob ? (
                          format(new Date(profileFormik.values.dob), 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={new Date(profileFormik.values.dob)}
                        onSelect={dobHandler}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    disabled
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={showMeData?.user?.email}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className='grid gap-4'>
              <Button
                type='submit'
                disabled={
                  updateProfileIsLoading ||
                  _.isEqual(profileFormik.values, profileFormik.initialValues)
                }
              >
                {updateProfileIsLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Update
              </Button>
              <Button
                disabled={deleteAccountIsLoading}
                type='button'
                variant='destructive'
                onClick={deleteAccountHandler}
              >
                {deleteAccountIsLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Delete Account
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </section>
  );
};

export default Profile;
