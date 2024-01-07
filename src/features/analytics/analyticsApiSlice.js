import { omitEmptyKeys } from '@/utils/helper';
import apiSlice from '../../state/api/apiSlice';

const analyticsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: (queryParams) => ({
        url: '/analytics/overview',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['Overview'],
    }),
    getCategoryAverageRating: builder.query({
      query: (queryParams) => ({
        url: '/analytics/categories/average-rating',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['CategoryAverageRating'],
    }),
    getCategoryTopDownloads: builder.query({
      query: (queryParams) => ({
        url: '/analytics/categories/top-download',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['CategoryTopDownloads'],
    }),
    getTopAppsRating: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/top-rating',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['TopAppsRating'],
    }),
    getTopExpensiveApp: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/top-expensive',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['TopExpensiveApp'],
    }),
    getTopReviewedApp: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/top-reviewed',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['TopReviewedApp'],
    }),
    getTopCommentedApp: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/top-commented',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['TopCommentedApp'],
    }),
    getRatingByTypeAndCategory: builder.query({
      query: (queryParams) => ({
        url: '/analytics/categories/rating-type',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['RatingByTypeAndCategory'],
    }),
    getFreePaidCount: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/free-paid',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['FreeVsPaidCount'],
    }),
    getContentRatingAppCount: builder.query({
      query: (queryParams) => ({
        url: '/analytics/apps/content-rating',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['ContentRatingAppCount'],
    }),
  }),
});

export const {
  useGetOverviewQuery,
  useGetCategoryAverageRatingQuery,
  useGetCategoryTopDownloadsQuery,
  useGetTopAppsRatingQuery,
  useGetTopExpensiveAppQuery,
  useGetTopReviewedAppQuery,
  useGetTopCommentedAppQuery,
  useGetRatingByTypeAndCategoryQuery,
  useGetFreePaidCountQuery,
  useGetContentRatingAppCountQuery,
} = analyticsApiSlice;
