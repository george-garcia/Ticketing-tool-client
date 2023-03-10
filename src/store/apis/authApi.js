import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import config from "./config";
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: `${config}/api/v1/auth`,
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
            registerUser: builder.mutation({
                query(json) {
                    return {
                        url: `/register`,
                        method: 'POST',
                        body: json
                    }
                }
            }),
            loginUser: builder.mutation({
                query(json) {
                    return {
                        url: '/login',
                        method: 'POST',
                        body: json,
                    }
                }
            }),
        }
    }
});

export const {useRegisterUserMutation, useLoginUserMutation} = authApi;
export {authApi};