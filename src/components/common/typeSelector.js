import * as React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

const OPTIONS = [
  { id: 1, name: 'Free', value: 'FREE' },
  { id: 2, name: 'Paid', value: 'PAID' },
];

const TypeSelector = (props) => {
  const { setTypeHandler, clearTypeHandler, type } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='h-8 justify-center border-dashed text-xs'
        >
          Type
          {!!type.length && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal'
              >
                {`${type.length} selected`}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {OPTIONS.map((option) => {
                const isSelected = type.includes(option.value);
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={setTypeHandler.bind(null, option.value)}
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
                    <span className='text-xs capitalize'>{option.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {!!type.length && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={clearTypeHandler}
                    className='justify-center text-center text-xs cursor-pointer'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TypeSelector;
