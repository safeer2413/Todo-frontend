
import React, { useState, useEffect } from 'react';
import TodoCard from '../Component/TodoCard';
import { ScaleLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } from '../Slices/todoApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserLogoutMutation } from '../Slices/userApiSlice'
import { logout } from '../Slices/authSlice';
import "./Login.css"; // Import the CSS file


function Homepage() {

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    }, []);

    let [title, setTitle] = useState('')
    let [description, setDescription] = useState('')

    const [addTodo] = useAddTodoMutation();
    const [userLogout] = useUserLogoutMutation();
    const { data: todos, refetch, isLoading } = useGetTodosQuery({ userId: userInfo?._id });
    const [deleteTodo] = useDeleteTodoMutation();


    const addTodoHandler = async (e) => {
        e.preventDefault();
        try {
            await addTodo({ title, description, userId: userInfo._id }).unwrap()
            toast.success('Added Success Full');
            refetch();
            setTitle('');
            setDescription('');


        } catch (error) {
            toast.error(error.message);
            console.error(error);
        }
    };

    const deleteTodoHandler = async (id) => {
        try {
            await deleteTodo(id).unwrap();
            refetch();
            toast.success('Deleted Success Full');

        } catch (error) {
            toast.error("Error deleting todo");
            console.error(error);
        }
    };

    const logoutHandler = async () => {
        try {
            await userLogout().unwrap();
            await dispatch(logout());

            toast.success('Logout SuccessFul');
            navigate('/login');
        } catch (error) {
            toast.error("Logout Failed");
            console.error(error);
        }
    }

    return (
        <>

            <div className='screen-container'>

                <div className="todo-wrapper left-panel">

                    <button onClick={logoutHandler} className='logout-btn'>LogOut</button>
                    <h1 className="app-title">Todo List</h1>
                    <form onSubmit={addTodoHandler} className="todo-form">
                        <input
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="todo-input"
                            required
                        />
                        <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="todo-textarea"
                            required
                        ></textarea>

                        <button type="submit" className="todo-button">
                            {isLoading ? 'Loading...' : 'Add Todo'}
                        </button>

                    </form>
                </div>

                <div className='right-panel'>
                    <TodoCard todos={todos} isLoading={isLoading} deleteTodo={deleteTodoHandler} />
                </div>
            </div>



        </>

    )
}

export default Homepage
