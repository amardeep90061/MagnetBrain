import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

const TaskUpdateForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');
    
    const API_URL = `https://magnet-brain-backend.vercel.app/api/task/${id}`; 

    const formatDate = (isoString) => {
        if (!isoString) return '';
        return isoString.substring(0, 10);
    };

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(API_URL,{
                    method: 'GET',
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setTaskData(data); 
                    setTitle(data.title);
                    setDescription(data.description);
                    setDueDate(formatDate(data.dueDate));
                    setStatus(data.status); 

                } else {
                    console.error('Failed to fetch task');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };
        fetchTask();
    }, [id, API_URL]); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const updateData = {
            title,
            description,
            dueDate,
            status,
        };
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization':localStorage.getItem('token')
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setMessage(`Task "${updatedTask.title}" updated successfully!`);
                
                setTimeout(() => {
                    navigate('/tasks'); 
                }, 1000);

            } else {
                const errorData = await response.json();
                setMessage(`Update failed: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            setMessage(`Network error during update: ${error.message}`);
        }
    };

    const deleteTask = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Do you want to proceed?");
        if(isConfirmed){
        try {
            const response = await fetch(API_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                        'Authorization':localStorage.getItem('token')
                },
            });     
            if (response.ok) {
                setMessage('Task deleted successfully!');   
                setTimeout(() => {
                    navigate('/tasks');
                }, 1000);
            }           
            else {
                const errorData = await response.json();
                setMessage(`Delete failed: ${errorData.error || response.statusText}`);
            }       
        } catch (error) {
            setMessage(`Network error during delete: ${error.message}`);
        }       
    }};  


    if (!taskData) {
        return <div className="p-10 text-center text-xl">Loading task data...</div>;
    }

    return (
        <div>
      <Navbar/>
            <h2 className='p-4 text-2xl ml-4'>Update your task</h2>
            <form className="p-8" onSubmit={handleSubmit}>
                <label htmlFor="title" className="p-2">Title </label>
                <div className="col-sm-10">
                    <input 
                        type="text" 
                        className="border-gray-300 border w-1/4 m-2 p-2 rounded-md mb-5" 
                        id="title" 
                        name='title' 
                        value={title} // Use local state
                        onChange={(e) => setTitle(e.target.value)} // Use local setter
                        placeholder='Enter your Title' 
                        required
                    />
                </div>
                
                <label htmlFor="description" className="p-2">Description </label>
                <div className="col-sm-10">
                    <textarea cols="30" rows="6" 
                        type="text" 
                        className="border-gray-300 border w-1/4 m-2 p-2 rounded-md mb-5" 
                        id="description" 
                        name='description' 
                        value={description} // Use local state
                        onChange={(e) => setDescription(e.target.value)} // Use local setter
                        required 
                        placeholder='Enter your Description'
                    />
                </div>
                
                <label htmlFor="dueDate" className="p-2">Select Due Date: </label>
                <div className="col-sm-10">
                    <input 
                        type="date" 
                        className="border-gray-300 border w-1/4 m-2 p-2 rounded-md mb-5" 
                        id="dueDate" 
                        name='dueDate' 
                        onChange={(e) => setDueDate(e.target.value)} // Use local setter
                        value={dueDate} // Use local state (YYYY-MM-DD format)
                    />
                </div>
                <label htmlFor="status" className="p-2">Status: </label>
                <div className="col-sm-10">
                    <select
                        id="status"
                        name="status"
                        className="border-gray-300 border w-1/4 m-2 p-2 rounded-md mb-5 bg-white focus:border-blue-500 focus:outline-none"
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className='flex gap-5'>
                    <button type="submit" className="login-button mt-3 bg-green-700 px-10 py-2 rounded ml-2 text-white">
                    Update Task
                </button>
                <button onClick={deleteTask} type="submit" className="login-button mt-3 bg-red-700 px-10 py-2 rounded ml-2 text-white">Delete</button>
                </div>
                
            </form>
            <Footer/>
        </div>
    );
}

export default TaskUpdateForm;
