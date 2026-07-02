import { api } from './baseApi'
import type { Team } from '../types'

export const teamsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<Team[], void>({
      query: () => '/teams',
      providesTags: [{ type: 'Teams', id: 'LIST' }],
    }),

    createTeam: builder.mutation<Team, { name: string }>({
      query: (body) => ({ url: '/teams', method: 'POST', body }),
      invalidatesTags: [{ type: 'Teams', id: 'LIST' }],
    }),

    updateTeam: builder.mutation<Team, { id: number; name: string }>({
      query: ({ id, name }) => ({ url: `/teams/${id}`, method: 'PATCH', body: { name } }),
      invalidatesTags: [{ type: 'Teams', id: 'LIST' }],
    }),

    // Clears team_id on members via the FK, so refresh the user list too.
    deleteTeam: builder.mutation<{ deleted: boolean }, number>({
      query: (id) => ({ url: `/teams/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Teams', id: 'LIST' }, { type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi
