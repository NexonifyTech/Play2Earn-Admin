import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/userSlice";
import { AuthApi } from "./api/AuthApi";
import { NotificationApi } from "./api/NotificationApi";
import { SettingApi } from "./api/SettingsApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [NotificationApi.reducerPath]:NotificationApi.reducer,
    [SettingApi.reducerPath]:SettingApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      NotificationApi.middleware,
      SettingApi.middleware,
    ]),
});
