import React, { useEffect, useState } from "react";
import "./Login.css"; // Import the CSS file
import { useUserLoginMutation } from "../Slices/userApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../Slices/authSlice";
import { ScaleLoader } from "react-spinners";


function LoginPage() {

    const { userInfo } = useSelector((state) => state.auth)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userLogin, { isLoading }] = useUserLoginMutation();

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const userLoginHandler = async (e) => {
        e.preventDefault();
        try {
            let response = await userLogin({ email, password }).unwrap();
            await dispatch(setCredentials({ ...response }));
            toast.success("login success");
            navigate('/')

        } catch (error) {
            toast.error(error?.message || error?.data?.message);
            toast.error('User not found');
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);  

    return (
        <>
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form onSubmit={userLoginHandler} className="login-form">
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />

                    <button type="submit" className="login-button" >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {isLoading &&

                        <div className="loader">
                            <ScaleLoader color="rgb(29, 12, 91)" />
                        </div>}

                    <div className="message">
                        <Link to="/register" className="message">
                            Create an Account? <strong>Register</strong>
                        </Link>
                    </div>

                </form>
            </div>
        </>
    );
};

export default LoginPage;
