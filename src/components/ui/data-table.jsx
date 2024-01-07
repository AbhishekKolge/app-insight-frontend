'use client';
import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Skeleton } from '@/components/ui/skeleton';
import { XOctagon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import headers from '../report/headerData';
import CustomTableHeader from '../report/tableHeader';

export function DataTable({
  isLoading,
  onNext,
  onPrev,
  totalPages,
  currentPage,
  columns,
  data,
  onSort,
  sortKey,
  sortType,
  onSearch,
  searchValue,
  clearCategory,
  clearGenre,
  clearContentRating,
  addCategory,
  addGenre,
  addContentRating,
  clearAllFilters,
  categoryId,
  genreId,
  contentRatingId,
  setTypeHandler,
  clearTypeHandler,
  type,
}) {
  const [columnFilters, setColumnFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    enableRowSelection: false,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className='space-y-4 p-1'>
      <DataTableToolbar
        onSearch={onSearch}
        searchValue={searchValue}
        clearCategory={clearCategory}
        clearGenre={clearGenre}
        clearContentRating={clearContentRating}
        addCategory={addCategory}
        addGenre={addGenre}
        addContentRating={addContentRating}
        clearAllFilters={clearAllFilters}
        categoryId={categoryId}
        genreId={genreId}
        contentRatingId={contentRatingId}
        setTypeHandler={setTypeHandler}
        clearTypeHandler={clearTypeHandler}
        type={type}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((head) => {
                return (
                  <TableHead className='text-xs p-3' key={head.key}>
                    <CustomTableHeader
                      onSort={onSort}
                      sortKey={sortKey}
                      sortType={sortType}
                      data={head}
                    />
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              new Array(10).fill(0).map((_, key) => {
                return (
                  <TableRow className='hover:bg-transparent' key={key}>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center text-xs p-2'
                    >
                      <Skeleton className='h-full w-full' />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='text-xs p-3' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className='hover:bg-transparent'>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-xs p-3'
                >
                  <div className='flex flex-col gap-2 items-center'>
                    <XOctagon strokeWidth={0.5} size={30} />
                    No records found.
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        onNext={onNext}
        onPrev={onPrev}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
