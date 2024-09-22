import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/userSlice";
import { AuthApi } from "./api/AuthApi";
import { NotificationApi } from "./api/NotificationApi";
import { SettingApi } from "./api/SettingsApi";
import { TransactionApi } from "./api/TransactionApi";
import { UserListApi } from "./api/UserListApi";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [NotificationApi.reducerPath]:NotificationApi.reducer,
    [SettingApi.reducerPath]:SettingApi.reducer,
    [TransactionApi.reducerPath]:TransactionApi.reducer,
    [UserListApi.reducerPath]:UserListApi.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      NotificationApi.middleware,
      SettingApi.middleware,
      TransactionApi.middleware,
      UserListApi.middleware,
    ]),
});
