import { createApi } from "@reduxjs/toolkit/query/react";
import CustomFetchBase from "./CustomFetchBase";

export const TransactionApi = createApi({
  reducerPath: "TransactionApi",
  baseQuery: CustomFetchBase,
  tagTypes: ["TRANSACTION"],
  endpoints: (build) => ({
    getTransaction: build.query({
      query: () => ({
        url: `/transaction/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["TRANSACTION"],
    }),
  

    addTransaction: build.mutation({
      query: ({data}) => {
        return {
          url: `/transaction`,
          method: "POST",
          body: data,
          headers: {
           
          },
        };
      },
      invalidatesTags: ["TRANSACTION"],
    }),
        

    editTransaction: build.mutation({
      query: ({ id,data }) => {
         return {
          url: `/transaction/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["TRANSACTION"],
    }),
    
    
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `/Transaction/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["TRANSACTION"],
    }),
  }),
});

export const { useGetTransactionQuery,useDeleteTransactionMutation,
    useAddTransactionMutation,useEditTransactionMutation} = TransactionApi;
