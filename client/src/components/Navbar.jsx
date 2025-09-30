import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

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
        <Link to="/tasks"><b>Home</b></Link>
        <Link to="/tasks"><b>All Tasks</b></Link>
        <Link to="/taskCreate"><b>Create A task</b></Link>
        </div>
        <div className='flex gap-8'>
          {isLogin ? (
            <div className="flex gap-4">
                <p>Welcome, {email}</p>
                <Link onClick={handleLogout} className='cursor-pointer'>
                    <b>Logout</b>
                </Link>
            </div>
        ) : (
            <div className="auth-links">
                <Link to="/login" className='cursor-pointer'>
                    <b>LogIn</b>
                </Link>
                <Link to='/signup' className='cursor-pointer ml-[10px]'>
                    <b>SignUp</b>
                </Link>
            </div>
        )}
        </div>
</nav>
  )
}

export default Navbar
