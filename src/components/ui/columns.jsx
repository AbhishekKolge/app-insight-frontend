'use client';
import { Star, MessageCircle, Database, ArrowDownToLine } from 'lucide-react';
import clsx from 'clsx';

import { Badge } from './badge';
import { DataTableColumnHeader } from './data-table-column-header';

import { formatNumber, formatCurrency } from '@/utils/numberFormat';
import { formatISTDate } from '@/utils/time';

export const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const installs = row.original.installCount || 0;

      return (
        <div className='flex space-y-2 flex-col'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('name')}
          </span>
          <Badge className='w-max text-[10px] font-normal'>
            {formatNumber(installs)}
            <ArrowDownToLine className='ml-1' strokeWidth={2} size={14} />
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rating' />
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating');

      return (
        <div className='flex space-x-1 items-center'>
          {!!rating && <Star strokeWidth={0.5} size={14} />}

          <span>{!!rating ? rating : <code>&#8212;</code>}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'reviewCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Review Count' />
    ),
    cell: ({ row }) => {
      const reviewCount = row.getValue('reviewCount');

      return (
        <div className='flex space-x-1 items-center'>
          {!!reviewCount && <MessageCircle strokeWidth={0.5} size={14} />}
          <span>{!!reviewCount ? reviewCount : <code>&#8212;</code>}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Size (MB)' />
    ),
    cell: ({ row }) => {
      const size = row.getValue('size')?.toFixed(1);

      return (
        <div className='flex space-x-1 items-center'>
          {!!size && <Database strokeWidth={0.5} size={14} />}
          <span>{!!size ? size : <code>&#8212;</code>}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type');

      return (
        <div className='flex space-x-1 items-center'>
          {type ? (
            <Badge
              className={clsx(
                'capitalize text-neutral-950 text-xs font-normal',
                type === 'FREE'
                  ? 'bg-green-300 hover:bg-green-300'
                  : 'bg-red-300 hover:bg-red-300'
              )}
            >
              {type.toLowerCase()}
            </Badge>
          ) : (
            <span className='capitalize'>
              <code>&#8212;</code>
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      const price = row.getValue('price');

      return (
        <div className='flex space-x-1 items-center'>
          <span>{!!price ? formatCurrency(price) : <code>&#8212;</code>}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        disableFilters={true}
        column={column}
        title='Category'
      />
    ),
    cell: ({ row }) => {
      const category = row.getValue('category')?.name;

      return (
        <div className='flex space-x-1 items-center'>
          <span className='capitalize'>
            {category ? category.toLowerCase() : <code>&#8212;</code>}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'contentRating',
    header: ({ column }) => (
      <DataTableColumnHeader
        disableFilters={true}
        column={column}
        title='Content'
      />
    ),
    cell: ({ row }) => {
      const contentRating = row.getValue('contentRating')?.name;

      return (
        <div className='flex space-x-1 items-center'>
          <span className='capitalize'>
            {contentRating ? contentRating.toLowerCase() : <code>&#8212;</code>}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'genre',
    header: ({ column }) => (
      <DataTableColumnHeader
        disableFilters={true}
        column={column}
        title='Genre'
      />
    ),
    cell: ({ row }) => {
      const genre = row.getValue('genre')?.name;

      return (
        <div className='flex space-x-1 items-center'>
          <span className='capitalize'>
            {genre ? genre.toLowerCase() : <code>&#8212;</code>}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        disableFilters={true}
        column={column}
        title='updated At'
      />
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt');

      return (
        <div className='flex space-x-1 items-center'>
          <span className='capitalize'>
            {updatedAt ? formatISTDate(updatedAt) : <code>&#8212;</code>}
          </span>
        </div>
      );
    },
  },
];
