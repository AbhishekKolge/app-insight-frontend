'use client';
import { Cross2Icon } from '@radix-ui/react-icons';

import { Button } from './button';
import { Input } from './input';
import CategorySelector from '../common/categorySelector';
import GenreSelector from '../common/genreSelector';
import ContentRatingSelector from '../common/contentRatingSelector';
import TypeSelector from '../common/typeSelector';

export function DataTableToolbar({
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
  const isFiltered =
    categoryId.length ||
    genreId.length ||
    contentRatingId.length ||
    type.length;

  return (
    <div className='flex items-center justify-between'>
      <div className='w-full flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search...'
          value={searchValue}
          onChange={onSearch}
          className='text-xs h-8 w-[150px] lg:w-[250px]'
        />
        <div className="overflow-x-scroll flex items-center space-x-2">
          <CategorySelector
          onSelect={addCategory}
          selected={categoryId}
          onClear={clearCategory}
          />
          <GenreSelector
            onSelect={addGenre}
            selected={genreId}
            onClear={clearGenre}
          />
          <ContentRatingSelector
            onSelect={addContentRating}
            selected={contentRatingId}
            onClear={clearContentRating}
          />
          <TypeSelector
            setTypeHandler={setTypeHandler}
            clearTypeHandler={clearTypeHandler}
            type={type}
          />
          {!!isFiltered && (
            <Button
              variant='rating'
              onClick={clearAllFilters}
              className='h-8 px-2 lg:px-3 text-xs'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
