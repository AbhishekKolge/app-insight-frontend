import apiSlice from '../../state/api/apiSlice';

const useApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    showMe: builder.query({
      query: () => ({
        url: '/users/show-me',
      }),
      providesTags: ['User'],
    }),
    uploadProfileImage: builder.mutation({
      query: (fileData) => ({
        url: '/users/profile-image',
        method: 'POST',
        body: fileData,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userDetails) => ({
        url: '/users',
        method: 'PATCH',
        body: userDetails,
      }),
      invalidatesTags: ['User'],
    }),
    removeProfileImage: builder.mutation({
      query: (profileImageId) => ({
        url: '/users/profile-image',
        method: 'DELETE',
        params: { profileImageId },
      }),
      invalidatesTags: ['User'],
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: '/users',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useShowMeQuery,
  useUploadProfileImageMutation,
  useUpdateProfileMutation,
  useRemoveProfileImageMutation,
  useDeleteAccountMutation,
} = useApiSlice;
