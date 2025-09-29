import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [email,setEmail]=useState();
  const [isLogin,setIsLogin]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    setEmail(localStorage.getItem('loggedInUser'));
    const token=localStorage.getItem('token');
    if(token){
      setIsLogin(true);
    }
  },[])

  const handleLogout=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }

  return (
    <nav className="w-full bg-gray-200 flex justify-between py-4 px-10">
        <div className='flex gap-8'>
        <a href="/tasks"><b>Home</b></a>
        <a href="/tasks"><b>All Tasks</b></a>
        <a href="/taskCreate"><b>Create A task</b></a>
        </div>
        <div className='flex gap-8'>
          {isLogin ? (
            <div className="flex gap-4">
                <p>Welcome, {email}</p>
                <a onClick={handleLogout} className='cursor-pointer'>
                    <b>Logout</b>
                </a>
            </div>
        ) : (
            <div className="auth-links">
                <a href="/login" className='cursor-pointer'>
                    <b>LogIn</b>
                </a>
                <a href='/signup' className='cursor-pointer ml-[10px]'>
                    <b>SignUp</b>
                </a>
            </div>
        )}
        </div>
</nav>
  )
}

export default Navbar
