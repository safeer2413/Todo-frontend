import { apiSlice } from "./apiSlices"

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        userLogin: builder.mutation({
            query: (data)=>({
                url: '/api/users',
                method: 'POST',
                body: data
            }),
        }),
        
        registerUser: builder.mutation({
            query: (data)=>({
                url: '/api/users/register',
                method: 'POST',
                body: data
            }),
        }),
        userLogout: builder.mutation({
            query: () =>({
                url: '/api/users/logout',
                method: 'GET'
            }),
        })
    })
}) 

export const {
    useUserLoginMutation,
    useRegisterUserMutation,
    useUserLogoutMutation
} = userApiSlice

export default userApiSlice;
