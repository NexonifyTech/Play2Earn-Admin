import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const NotificationApi = createApi({
  reducerPath: "NotificationApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["NOTIFICATION"],
  endpoints: (build) => ({
    getNotification: build.query({
      query: () => ({
        url: `/notification/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["NOTIFICATION"],
    }),
  

    addNotification: build.mutation({
      query: ({ title, message, image }) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('message', message);
        formData.append('image', image);
    
        return {
          url: `/notification`,
          method: "POST",
          body: formData,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["NOTIFICATION"],
    }),
    
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const { useGetNotificationQuery,useDeleteNotificationMutation,
    useAddNotificationMutation} = NotificationApi;
