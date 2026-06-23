import { api } from './baseApi'
import type { CreateTicketInput, Ticket, TicketFilters, UpdateTicketInput } from '../types'

export const ticketsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<Ticket[], TicketFilters | void>({
      query: (filters) => ({ url: '/tickets', params: filters ?? undefined }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({ type: 'Ticket' as const, id: t.id })),
              { type: 'Tickets' as const, id: 'LIST' },
            ]
          : [{ type: 'Tickets' as const, id: 'LIST' }],
    }),

    getTicket: builder.query<Ticket, number>({
      query: (id) => `/tickets/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Ticket', id }],
    }),

    createTicket: builder.mutation<Ticket, CreateTicketInput>({
      query: (body) => ({ url: '/tickets', method: 'POST', body }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
    }),

    updateTicket: builder.mutation<Ticket, { id: number; changes: UpdateTicketInput }>({
      query: ({ id, changes }) => ({ url: `/tickets/${id}`, method: 'PATCH', body: changes }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Ticket', id },
        { type: 'Tickets', id: 'LIST' },
      ],
    }),

    addComment: builder.mutation<Ticket, { id: number; body: string }>({
      query: ({ id, body }) => ({ url: `/tickets/${id}/comments`, method: 'POST', body: { body } }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Ticket', id }],
    }),

    deleteTicket: builder.mutation<{ deleted: boolean }, number>({
      query: (id) => ({ url: `/tickets/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTicketsQuery,
  useGetTicketQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useAddCommentMutation,
  useDeleteTicketMutation,
} = ticketsApi
