import React, { useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

const RefreshHandler = ({setIsAuthenticated,setIsLoading }) => {
    const location=useLocation();
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            // console.log(localStorage.getItem('token'));
            if(location.pathname==='/'|| location.pathname==='/login'||location.pathname==='/signup'){
                navigate('/tasks',{replace:false});
            }
        }
        setIsLoading(false); 
    },[location,navigate,setIsAuthenticated,setIsLoading])
  return null
}

export default RefreshHandler
