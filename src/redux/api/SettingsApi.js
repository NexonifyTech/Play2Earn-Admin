import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const SettingApi = createApi({
  reducerPath: "SettingApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["SETTING"],
  endpoints: (build) => ({
    getSetting: build.query({
      query: () => ({
        url: `/home`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["SETTING"],
    }),
  

    editSetting: build.mutation({
      query: ({ id,data }) => {
         return {
          url: `/Setting/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["SETTING"],
    }),
    
    
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/home/banners/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["SETTING"],
    }),
    deleteSetting: build.mutation({
        query: (id) => ({
          url: `/Setting/${id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["SETTING"],
      }),
  }),

});

export const { useGetSettingQuery,useDeleteBannerMutation,
    useEditSettingMutation} = SettingApi;
