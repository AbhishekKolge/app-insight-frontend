import { LogOut, User, Loader2 } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { getInitials } from '@/utils/helper';

const NavAction = (props) => {
  const { auth, onLogout, isLoggingOut } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-[50px] w-[50px] cursor-pointer'>
          <AvatarImage
            className='object-cover '
            src={auth.profileImage}
            alt={`@${auth.name}`}
          />
          <AvatarFallback className='uppercase'>
            {getInitials(auth.name)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-56'>
        <DropdownMenuLabel className='grid gap-1'>
          <span>My Account</span>
          <span className='text-xs text-slate-400'>{`@${auth.name}`}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/user/profile'>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          {isLoggingOut && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavAction;
