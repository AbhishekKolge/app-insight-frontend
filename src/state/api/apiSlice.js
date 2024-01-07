import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logoutHandler } from '../../features/auth/authAction';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logoutHandler({ isSession: true }));
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    'User',
    'Report',
    'Category',
    'ContentRating',
    'Genre',
    'Overview',
    'CategoryAverageRating',
    'CategoryTopDownloads',
    'TopAppsRating',
    'TopExpensiveApp',
    'TopReviewedApp',
    'TopCommentedApp',
    'RatingByTypeAndCategory',
    'FreeVsPaidCount',
    'ContentRatingAppCount',
  ],
  endpoints: () => ({}),
});

export default apiSlice;
