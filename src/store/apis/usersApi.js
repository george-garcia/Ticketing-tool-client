import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//localStorage.getItem('token')

const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/users',
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
            updateUser: builder.mutation({
                invalidatesTags: ['users'],
                query(arg) {
                    return {
                        url: `/${arg.userId}`,
                        method: 'PATCH',
                        body: arg.body
                    }
                }
            }),
            fetchUsers: builder.query({
                providesTags: (result, error, user) => {
                    return [{type: 'users'}]
                },
                query(user) {
                    return {
                        url: '/',
                        // headers: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2IwZmMyZjE1OWZmNDI1M2M3NzA3MTkiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjcyNTQ4MzM0LCJleHAiOjE2NzUxNDAzMzR9.PPGAlks7Ghk8yAm7PHFV8H1xtteU-tf_-DKvwqrshKg',
                        method: 'GET',
                    }
                }
            }),
            fetchOneUser: builder.query({
                query(id) {
                    return {
                        url: `/${id}`,
                        method: 'GET',
                    };
                }
            }),
            deleteUser: builder.query({
                invalidatesTags: ['users'],
                query(id) {
                    return {
                        url: `/${id}`,
                        method: 'DELETE',
                    }
                }
            })
        }
    }
});

export const {useFetchUsersQuery, useUpdateUserMutation, useFetchOneUserQuery, useDeleteUserMutation} = usersApi;
export {usersApi};