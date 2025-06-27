import React, { useContext, useEffect, useState } from 'react';
import { useStored } from '../context/StoredContext'
import axiosInstance from '../axiosInstance';


const Login = ({ setShowLogin }) => {
    const { setToken } = useStored();
    const url = "/user"
   

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        country: "",
        email: "",
        password: ""
    })
    function parseJwt (token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

    const changeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    useEffect(() => {
        console.log(data)
    }, [data])

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === 'Login') {
            newUrl += "/login"
        }
        else {
            newUrl += "/register"
        }
        try {
            const response = await axiosInstance.post(newUrl, data)

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token)

                const decoded = parseJwt(response.data.token);
                localStorage.setItem("userId", decoded.id)
                console.log("registration/login successful");
                window.location.reload();
                setShowLogin(false)
            }
            else {
                alert(response.data.message);
            }
        } catch (err) {
            alert("Login failed please try again");
            console.error(err);
        }
    }
    return (
        <div className="z-[1] fixed flex flex-col h-96 justify-center items-center w-full bg-[rgba(24,22,22,0.5)]">
            <form action="" className="bg-white overflow-y-scroll  shadow-2xl rounded-2xl max-w-lg w-full p-8" onSubmit={onLogin}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className='font-bold text-purple-500'>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src="" alt="" />
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    
                    {currState === "Login" ? <></> : <div className='flex flex-col gap-4'>
                        <input className='border p-2 rounded' name="first_name" onChange={changeHandler} value={data.first_name} type="text" placeholder="Your first name" required />
                        <input className='border p-2 rounded' name="last_name" onChange={changeHandler} value={data.last_name} type="text" placeholder="Your last name" required />
                        <input className='border p-2 rounded' name="date_of_birth" onChange={changeHandler} value={data.date_of_birth} type="date" placeholder="Your date of birth" required />
                        <input className='border p-2 rounded' name="country" onChange={changeHandler} value={data.country} type="text" placeholder="Your country" required />
                    </div>}

                    <input className='border p-2 rounded' name="email" onChange={changeHandler} value={data.email} type="email" placeholder="Email" required />
                    <input className='border p-2 rounded' name="password" onChange={changeHandler} value={data.password} type="password" placeholder="password" required />
                </div>
                <button className='text-white cursor-pointer p-2 rounded-xl border bg-purple-600' type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="flex gap-2 items-center mt-4">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use and policies</p>
                </div>
                {currState === 'Login' ? <p>Create a new account? <span className='text-purple-600 cursor-pointer' onClick={() => setCurrState("Sign Up")}>Create account</span></p> :
                    <p>Already have an account? <span className='text-purple-600 cursor-pointer' onClick={() => setCurrState("Login")}>Login here</span></p>}


            </form>
        </div>
    );
}

export default Login;