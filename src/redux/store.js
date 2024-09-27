import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import socketReducer from "./socketSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['socket'] // socket state को persist नहीं करेंगे
};

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    socket: socketReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with middleware
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredPaths: ['socket'], // यहां भी socket को ignore करेंगे
            },
        }),
});

export default store;
