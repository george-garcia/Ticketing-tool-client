import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//localStorage.getItem('token')

const ticketsApi = createApi({
    reducerPath: 'tickets',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/tickets',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');
            if(token){
                headers.set('authorization', token);
            }
            // console.log(getState);
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            updateTicket: builder.mutation({
                invalidatesTags: (result, error, ticket) => {
                    return [{ type: 'tickets', id: ticket.ticketId}]
                },
                query(arg) {
                    return {
                        url: `/${arg.ticketId}`,
                        method: 'PATCH',
                        body: arg
                    }
                }
            }),
            addNewComment: builder.mutation({
                invalidatesTags: (result, error, ticket) => {
                    return [{ type: 'tickets', id: ticket.ticketId}]
                },
                query(comment) {
                    return {
                        url: `/${comment.ticketId}`,
                        method: 'POST',
                        body: comment.body
                    }
                }
            }),
            fetchTickets: builder.query({
                providesTags: ['tickets'],
                query(user) {
                    return {
                        url: '/',
                        // headers: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2IwZmMyZjE1OWZmNDI1M2M3NzA3MTkiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjcyNTQ4MzM0LCJleHAiOjE2NzUxNDAzMzR9.PPGAlks7Ghk8yAm7PHFV8H1xtteU-tf_-DKvwqrshKg',
                        method: 'GET',
                    }
                }
            }),
            fetchOneTicket: builder.query({
                providesTags: (result, error, ticket) => {
                    return [{ type: 'tickets', id: ticket}];
                },
                query(id) {
                    return {
                        url: `/${id}`,
                        method: 'GET',
                    };
                }
            }),
            deleteTicket: builder.mutation({
                invalidatesTags: ['tickets'],
                query(id) {
                    return {
                        url: `/${id}`,
                        method: 'DELETE',
                    }
                }
            }),
            createTicket: builder.mutation({
                invalidatesTags: ['tickets'],
                query(json) {
                    return {
                        url: '/',
                        method: 'POST',
                        body: json,
                    }
                }
            })
        }
    }
});

export const {useCreateTicketMutation, useDeleteTicketMutation, useFetchOneTicketQuery, useFetchTicketsQuery, useUpdateTicketMutation, useAddNewCommentMutation} = ticketsApi;
export {ticketsApi};

//providesTags: (result, error, user) => {
//                     return [{type: 'tickets'}]
//                 },