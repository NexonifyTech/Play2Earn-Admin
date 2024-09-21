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
  

    editBanner: build.mutation({
      query: ({ id,data }) => {
         return {
          url: `/home/banners/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["SETTING"],
    }),
    

    editGame: build.mutation({
      query: ({ id,data }) => {
         return {
          url: `/home/gameCategories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["SETTING"],
    }),
    
    addBanner: build.mutation({
      query: ({data}) => {
        return {
          url: `/home/banners`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["SETTING"],
    }),
        
      
    addGame: build.mutation({
      query: ({data}) => {
        return {
          url: `/home/gameCategories`,
          method: "POST",
          body: data,
          headers: {
           
          },
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

      deleteGame: build.mutation({
        query: (id) => ({
          url: `/home/gameCategories/${id}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }),
        invalidatesTags: ["SETTING"],
      }),
  }),

});

export const { useGetSettingQuery,useDeleteBannerMutation,useDeleteGameMutation,
    useEditBannerMutation,useEditGameMutation,useAddBannerMutation,useAddGameMutation} = SettingApi;
