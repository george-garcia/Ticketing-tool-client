import { configureStore, createSlice} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { authApi } from "./apis/authApi";

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
        [authApi.reducerPath]: authApi.reducer
    },
    //boilerplate to get the api to work with the store
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware).concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchUsersQuery, useUpdateUserMutation, useFetchOneUserQuery, useDeleteUserMutation} from './apis/usersApi';
export {useRegisterUserQuery, useLoginUserQuery} from './apis/authApi';

export { store };

// export const { addUser } = usersSlice.actions;