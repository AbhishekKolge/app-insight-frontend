import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { DROPZONE_IMAGE_FORMAT, MAX_FILE_SIZE } from '@/utils/defaults';
import { validateDropzoneSingleFile, getInitials } from '@/utils/helper';

import { updateUserInfoHandler } from '@/features/auth/authAction';

const ProfileImage = (props) => {
  const { showMeData, isLoading, onUpload, onCancel, profileImageId } = props;
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...DROPZONE_IMAGE_FORMAT,
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      validateDropzoneSingleFile(rejectedFiles, MAX_FILE_SIZE);
      if (acceptedFiles[0]) {
        const formData = new FormData();
        formData.append('profileImage', acceptedFiles[0]);
        onUpload(formData)
          .unwrap()
          .then((data) => {
            dispatch(updateUserInfoHandler(data));
            toast.success('Profile image uploaded successfully');
          })
          .catch((error) => {
            if (error.data?.msg) {
              toast.error(error.data.msg);
            } else {
              toast.error('Something went wrong!, please try again');
            }
          });
      }
    },
    disabled: isLoading,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  });

  const cancelHandler = (e) => {
    e.stopPropagation();
    onCancel(profileImageId)
      .unwrap()
      .then(() => {
        dispatch(updateUserInfoHandler({ profileImage: null }));
        toast.success('Profile image removed successfully');
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
    <div className='w-32 h-32 relative m-auto' {...getRootProps({})}>
      {!isLoading && showMeData?.user?.profileImage && (
        <Button
          onClick={cancelHandler}
          variant='destructive'
          className='rounded-full absolute top-0 right-0 z-10'
          size='icon'
        >
          <X color='#fff' className='w-5 h-5' />
        </Button>
      )}
      <Avatar className='m-auto w-full h-full'>
        <AvatarImage
          className='object-cover'
          src={!isLoading ? showMeData?.user?.profileImage : ''}
          alt={`@${showMeData?.user?.name}`}
        />

        <AvatarFallback className='text-4xl uppercase'>
          {isLoading ? (
            <Loader2 className='h-[30px] w-[30px] animate-spin' />
          ) : (
            getInitials(showMeData?.user?.name || '')
          )}
        </AvatarFallback>
      </Avatar>
      <input {...getInputProps()} />
    </div>
  );
};

export default ProfileImage;
