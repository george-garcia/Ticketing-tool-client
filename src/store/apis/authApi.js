import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/v1/auth',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');
            if(!token)
                return;
            
            if(token){
                headers.set('authorization', token);
            }
            return headers;
        }
    }),
    endpoints(builder) {
        return {
            registerUser: builder.query({
                query(json) {
                    return {
                        url: `/register`,
                        method: 'POST',
                        body: json
                    }
                }
            }),
            loginUser: builder.query({
                query(json) {
                    return {
                        url: '/',
                        method: 'POST',
                        body: json,
                    }
                }
            }),
        }
    }
});

export const {useRegisterUserQuery, useLoginUserQuery} = authApi;
export {authApi};