import { api } from './baseApi'
import type { User } from '../types'

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['Me'],
    }),

    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: [{ type: 'Users', id: 'LIST' }],
    }),

    updateMe: builder.mutation<User, Partial<Pick<User, 'firstName' | 'lastName' | 'pictureUrl'>>>({
      query: (body) => ({ url: '/users/me', method: 'PATCH', body }),
      invalidatesTags: ['Me'],
    }),

    // Fixed: this was incorrectly declared as a `builder.query` in the old codebase.
    deleteUser: builder.mutation<{ deleted: boolean }, number>({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const { useGetMeQuery, useGetUsersQuery, useUpdateMeMutation, useDeleteUserMutation } =
  usersApi
