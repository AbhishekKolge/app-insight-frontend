'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileCardLoading = () => {
  return (
    <Card className='w-[350px] md:w-[450px]'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between mb-4'>
          My Profile
          <span className='flex items-center gap-2'>
            <Skeleton className='h-6 w-14 rounded-full' />
            <Skeleton className='h-6 w-14 rounded-full' />
          </span>
        </CardTitle>

        <Skeleton className='w-32 h-32 rounded-full m-auto' />
      </CardHeader>
      <form>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Skeleton className='h-[40px] w-full' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Date of birth</Label>
              <Skeleton className='h-[40px] w-full' />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Skeleton className='h-[40px] w-full' />
            </div>
          </div>
        </CardContent>
        <CardFooter className='grid gap-4'>
          <Button disabled>Update</Button>
          <Button disabled variant='destructive'>
            Delete Account
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileCardLoading;
