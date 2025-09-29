import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
const TaskCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'https://magnet-brain-la6388ra6-amardeep-prajapatis-projects.vercel.app/api/createTask';

  const handleSubmit = async (e) => {
     e.preventDefault(); 
        setMessage('Submitting...');

        const formData = {
            title,
            description,
            // Only include dueDate if it has a value, otherwise, let the backend default it
            ...(dueDate && { dueDate }), 
        };
        console.log(formData);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':localStorage.getItem('token')
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newTask = await response.json();
                setMessage(`Task created successfully! Title: ${newTask.title}`);
                setTitle('');
                setDescription('');
                setDueDate('');
            } else {
                const errorData = await response.json();
                setMessage(`Failed to create task: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            setMessage(`Network error: ${error.message}. Check if server is running on port 3000.`);
        }
  }
    
  return (
    <>
      <Navbar/>
     {message && <p className="p-2 ml-10 text-lg font-semibold text-blue-600">{message}</p>}
     <h2 className='p-4 text-2xl ml-4'>Crete a New task</h2>
      <form className="p-8" onSubmit={handleSubmit}>
        <label htmlFor="title" className="p-2">Title </label>
        <div className="col-sm-10">
          <input type="text" className="border-gray-300 border w-[350px] m-2 p-2 rounded-md mb-5" id="title" name='title' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter your Title' required/>
        </div>
        <label htmlFor="description" className="p-2">Description </label>
        <div className="col-sm-10">
          <textarea cols="30" rows="6"  type="text" className="border-gray-300 border w-[350px] m-2 p-2 rounded-md mb-5" id="description" name='description' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='Enter your Description'/>
        </div>
        <label htmlFor="dueDate" className="p-2">Select Due Date:  </label>
        <div className="col-sm-10">
          <input type="date" className="border-gray-300 border w-[350px] m-2 p-2 rounded-md mb-5" id="dueDate" name='dueDate' onChange={(e) => setDueDate(e.target.value)} value={dueDate}/>
        </div>
        <input type="dropdown" />
        <button type="submit" className="login-button mt-3 bg-green-700 px-10 py-2 rounded ml-2">Create</button>
      </form>
      <Footer/>
    </>
  )
}

export default TaskCreation
