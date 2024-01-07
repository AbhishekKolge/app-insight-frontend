'use client';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Check, Loader2, CircleSlash } from 'lucide-react';
import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { Separator } from './separator';
import { Badge } from './badge';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function ComboBoxPopover(props) {
  const {
    className,
    data,
    isLoading,
    onSearch,
    value,
    reset,
    onLoadMore,
    onSelect,
    selected,
    placeholder,
    onClear,
  } = props;
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const togglePopoverHandler = (value) => {
    setOpen(value);
    !value && reset();
  };

  useEffect(() => {
    if (inView) {
      onLoadMore();
    }
  }, [inView]);

  return (
    <div className={cn('flex items-center space-x-4', className)}>
      <Popover open={open} onOpenChange={togglePopoverHandler}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='h-8 justify-center border-dashed text-xs'
          >
            {placeholder}
            {!!selected.length && (
              <>
                <Separator orientation='vertical' className='mx-2 h-4' />
                <Badge
                  variant='secondary'
                  className='rounded-sm px-1 font-normal'
                >
                  {`${selected.length} selected`}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 w-auto' side='bottom' align='start'>
          <Command shouldFilter={false}>
            <CommandInput
              placeholder='Search...'
              onValueChange={onSearch}
              value={value}
              className='text-xs'
            />

            <CommandList>
              <CommandGroup>
                {!!data?.length ? (
                  data.map((item, index) => {
                    const lastItem = index === data.length - 1;
                    const isSelected = selected.includes(item.id);
                    return (
                      <CommandItem
                        ref={lastItem ? ref : null}
                        key={index}
                        onSelect={onSelect.bind(null, item.id)}
                        className='gap-4 text-xs'
                      >
                        <div
                          className={cn(
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            !!isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'opacity-50 [&_svg]:invisible'
                          )}
                        >
                          <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                        <span className='text-xs capitalize'>
                          {item.name.toLowerCase()}
                        </span>
                      </CommandItem>
                    );
                  })
                ) : isLoading ? (
                  <></>
                ) : (
                  <span className='text-center text-sm w-100 block p-4'>
                    <CircleSlash size={16} className='m-auto' />
                    <span className='mt-1 block'>Found nothing</span>
                  </span>
                )}
                {isLoading && (
                  <span className='text-center text-sm w-100 block p-4'>
                    <Loader2 className='m-auto h-4 w-4 animate-spin' />
                  </span>
                )}
              </CommandGroup>
            </CommandList>

            {!!selected.length && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onClear}
                    className='justify-center text-center text-xs cursor-pointer'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
