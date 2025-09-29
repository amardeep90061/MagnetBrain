import React, { useState } from 'react';
import {ToastContainer} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import Navbar from '../components/Navbar';

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault(); 

        if (!email || !password) {
            return handleError('Please enter all input field');
        }
        const formData = {
            email,password
        }; 
        try {
            const url="https://magnet-brain-la6388ra6-amardeep-prajapatis-projects.vercel.app/auth/login"
            const response= await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
            })
            const result=await response.json();
            const{success,message,token,email,error}=result;
            console.log(result);
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',token);
                localStorage.setItem('loggedInUser',email);
                setTimeout(()=>{
                    navigate('/tasks')
                },1000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="login-container p-5">
            <ToastContainer/>
            <Navbar/>
            <div className='p-10'>
            <h2 className='text-2xl mb-3'><i>User Login</i></h2>
            <form className="login-form" onSubmit={handleLogin}>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        className= 'border-gray-300 border w-[350px] m-2 p-2 rounded-md '
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className= 'border-gray-300 border w-[350px] m-2 p-2 rounded-md '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button mt-3 bg-green-700 px-10 py-2 rounded cursor-pointer">Log In</button>
                <br /><br /> 
                <span>Don't have an account ? <Link to='/signup' className='text-blue-500 cursor-pointer'>Signup</Link></span>
            </form>
            </div>
        </div>
    );
}

export default Login;
