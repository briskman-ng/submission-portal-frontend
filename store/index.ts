// store/index.ts
import { configureStore, combineReducers, Reducer, UnknownAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import { submissionApi } from "@/app/api/submissionsApi";
import { authApi } from "@/app/api/authApi";
import { fileUploadApi } from "@/app/api/fileUploadApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [], // nothing persisted yet
};

const combinedReducer = combineReducers({
  [submissionApi.reducerPath]: submissionApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [fileUploadApi.reducerPath]: fileUploadApi.reducer,
});

const rootReducer: Reducer = (state, action: UnknownAction) => combinedReducer(state, action);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }).concat(submissionApi.middleware).concat(authApi.middleware).concat(fileUploadApi.middleware),
    
});

export type RootStoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
export const persistor = persistStore(store);
