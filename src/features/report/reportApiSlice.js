import { omitEmptyKeys } from '@/utils/helper';
import apiSlice from '../../state/api/apiSlice';

const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query({
      query: (queryParams) => ({
        url: '/report',
        params: omitEmptyKeys(queryParams),
      }),
      providesTags: ['Report'],
    }),
  }),
});

export const { useGetReportQuery } = reportApiSlice;
