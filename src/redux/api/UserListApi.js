import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const UserListApi = createApi({
  reducerPath: "UserListApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["USERLIST"],
  endpoints: (build) => ({
    getUserList: build.query({
      query: () => ({
        url: `/users`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["USERLIST"],
    }),
  
    editUserList: build.mutation({
      query: ({data }) => {
         return {
          url: `/users/editUser`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["USERLIST"],
    }),
    
  
  }),
});

export const { useGetUserListQuery,useEditUserListMutation} = UserListApi;
