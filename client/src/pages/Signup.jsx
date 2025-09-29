import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../util';
import Navbar from '../components/Navbar';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate();
    const handleSignup = async(e) => {
        e.preventDefault(); 

        if (!username || !email || !password) {
            return handleError('Please enter all input field');
        }
        const formData = {
            username,email,password
        }; 
        try {
            const url="https://magnet-brain-la6388ra6-amardeep-prajapatis-projects.vercel.app/auth/signup"
            const response= await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData),
            })
            const result=await response.json();
            const{success,message,error,token,email}=result;
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

            <h2 className='text-2xl mb-3'><i>Create a new Account :</i></h2>
            <form className="login-form" onSubmit={handleSignup}> 
                
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className= 'border-gray-300 border w-[350px] m-2 p-2 rounded-md '
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
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
                <button type="submit" className="login-button mt-3 bg-green-700 px-10 py-2 rounded cursor-pointer">Signup</button>
                <br /><br /> 
                <span>Already have an account ? <Link to='/login' className='text-blue-500'>Login</Link></span>
            </form>
            </div>
        </div>
    );
}

export default Signup;
