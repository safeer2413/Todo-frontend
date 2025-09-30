import { apiSlice } from "./apiSlices";

export const todoApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query({
            query: ({ userId }) => ({
                url: `/todo/getTodos`,
                params: { userId }
            })
        }),
        getTodo: build.query({
            query: (id) => ({
                url: '/todo/getTodoById',
                method: 'GET',
                params: { id }
            })
        }),
        addTodo: build.mutation({
            query: (data) => ({
                url: `/todo/createTodo`,
                method: 'POST',
                body: data
            })
        }),
        updateTodo: build.mutation({
            query: (data) => ({
                url: '/todo/updateTodo',
                method: 'PATCH',
                body: data
            })
        }),
        deleteTodo: build.mutation({
            query: (id) => ({
                url: `/todo/${id}`,  // Expecting just the ID
                method: 'DELETE',
            }),
        })
    })
})

export const {
    useAddTodoMutation,
    useGetTodosQuery,
    useGetTodoQuery,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todoApiS