import { omitEmptyKeys } from '@/utils/helper';
import apiSlice from '../../state/api/apiSlice';

const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (queryParams) => ({
        url: '/common/category',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['Category'],
    }),
    getAllContentRatings: builder.query({
      query: (queryParams) => ({
        url: '/common/content-rating',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['ContentRating'],
    }),
    getAllGenres: builder.query({
      query: (queryParams) => ({
        url: '/common/genre',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['Genre'],
    }),
  }),
});

export const {
  useLazyGetAllCategoriesQuery,
  useLazyGetAllContentRatingsQuery,
  useLazyGetAllGenresQuery,
} = commonApiSlice;
