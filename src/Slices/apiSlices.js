import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/api",
  }),
  tagTypes: ['Todos', 'Users'],
  endpoints: (builder) => ({}),
})

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// export const apiSlice = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: '' }),
//     tagTypes: ['Todos'],
//     endpoints: () => ({})
// })