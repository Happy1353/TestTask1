import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Item {
  id: number;
  name: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    fetchList: builder.query<Item[], void>({
      query: () => '/list', 
    }),
    createItem: builder.mutation<Item, Partial<Item>>({
      query: (newItem) => ({
        url: '/list', 
        method: 'POST',
        body: newItem,
      }),
    }),
  }),
});

export const { useFetchListQuery, useCreateItemMutation } = apiSlice;
