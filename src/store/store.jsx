import { configureStore } from "@reduxjs/toolkit";
import usersAllSlice from "../features/usersAllSlice";
import getOneUserSlice from "../features/getOneUserSlice";
import currentUserSlice from "../features/currentUserSlice";
import postsSlice from "../features/postsSlice";
import searchSlice from "../features/searchSlice";


export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    reducer:{
        user:currentUserSlice,
        posts:postsSlice,
        usersAll:usersAllSlice,
        oneUser:getOneUserSlice,
        searchusers:searchSlice
    }
})