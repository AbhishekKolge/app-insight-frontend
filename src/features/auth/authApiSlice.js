import apiSlice from '../../state/api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/register',
        method: 'POST',
        body: userDetails,
      }),
    }),
    verify: builder.mutation({
      query: (verificationDetails) => ({
        url: '/auth/verify',
        method: 'POST',
        body: verificationDetails,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: userDetails,
      }),
    }),
    resetPassword: builder.mutation({
      query: (passwordDetails) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: passwordDetails,
      }),
    }),
    login: builder.mutation({
      query: (userDetails) => ({
        url: '/auth/login',
        method: 'POST',
        body: userDetails,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLoginMutation,
} = authApiSlice;
