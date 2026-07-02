import { api } from './baseApi'
import type { User, UserRole } from '../types'

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
      invalidatesTags: ['Me', { type: 'Users', id: 'LIST' }],
    }),

    updateUserRole: builder.mutation<User, { id: number; role: UserRole }>({
      query: ({ id, role }) => ({ url: `/users/${id}/role`, method: 'PATCH', body: { role } }),
      invalidatesTags: ['Me', { type: 'Users', id: 'LIST' }],
    }),

    assignUserTeam: builder.mutation<User, { id: number; teamId: number | null }>({
      query: ({ id, teamId }) => ({ url: `/users/${id}/team`, method: 'PATCH', body: { teamId } }),
      invalidatesTags: ['Me', { type: 'Users', id: 'LIST' }],
    }),

    // Fixed: this was incorrectly declared as a `builder.query` in the old codebase.
    deleteUser: builder.mutation<{ deleted: boolean }, number>({
      query: (id) => ({ url: `/users/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMeQuery,
  useGetUsersQuery,
  useUpdateMeMutation,
  useUpdateUserRoleMutation,
  useAssignUserTeamMutation,
  useDeleteUserMutation,
} = usersApi
