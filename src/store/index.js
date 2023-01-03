import { configureStore, createSlice} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { authApi } from "./apis/authApi";
import {ticketsApi} from "./apis/ticketsApi";

// const usersSlice = createSlice({
//     name: 'user',
//     initialState: [],
//     reducers: {
//         addUser(state, action) {
//             state.push(action.payload);
//         },
//         removeUser(state, action) {
//
//         },
//     }
// });

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ticketsApi.reducerPath]: ticketsApi.reducer
    },
    //boilerplate to get the api to work with the store
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware).concat(authApi.middleware).concat(ticketsApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchUsersQuery, useUpdateUserMutation, useFetchOneUserQuery, useDeleteUserMutation} from './apis/usersApi';
export {useRegisterUserQuery, useLoginUserMutation} from './apis/authApi';
export {useCreateTicketMutation, useDeleteTicketMutation, useFetchOneTicketQuery, useFetchTicketsQuery, useUpdateTicketMutation} from './apis/ticketsApi';


export { store };

// export const { addUser } = usersSlice.actions;