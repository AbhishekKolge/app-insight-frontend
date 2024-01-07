import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SortFilter = (props) => {
  const { data, onSort, sortKey, sortType } = props;

  return (
    <DropdownMenu className='text-xs' key={data.key}>
      <DropdownMenuTrigger asChild>
        <Button
          className='text-xs h-8 bg-transparent hover:bg-transparent'
          variant='secondary'
        >
          {data.title}
          {sortKey === data.key ? (
            sortType === 'asc' ? (
              <ArrowUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <ArrowDownIcon className='ml-2 h-4 w-4' />
            )
          ) : !!data.sort?.length ? (
            <CaretSortIcon className='ml-2 h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      {!!data.sort?.length && (
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {data.sort.map((sort) => {
              return (
                <DropdownMenuItem
                  onClick={onSort.bind(null, {
                    sortKey: data.key,
                    sortMethod: sort.key,
                    sortType: sort.type,
                    nullishSort: sort.nullishSort,
                  })}
                  className='text-xs'
                  key={sort.key}
                >
                  {sort.type === 'asc' ? (
                    <ArrowUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  ) : (
                    <ArrowDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                  )}
                  {sort.title}
                </DropdownMenuItem>
              );
            })}
            {sortKey === data.key && (
              <DropdownMenuItem
                onClick={onSort.bind(null, {
                  sortKey: null,
                  sortMethod: null,
                })}
                className='text-xs'
              >
                <X className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                Clear
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default SortFilter;
