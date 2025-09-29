import React from 'react'
import { Link } from 'react-router-dom'

const Task = ({task}) => {
  return (
    <div>
      <div  className='border p-4 my-2 w-[400px] rounded'>
        <h2 className='text-2xl font-semibold m-2 mb-4'>{task.title}</h2>
        <p><i>{task.description}</i></p>
        <p className='mt-2'><b>Status:</b> <button className={`ml-2 cursor-pointer border-gray-300 border px-4 py-1 rounded-full font-semibold text-sm text-white ${task.status === 'pending' ? 'bg-red-500' : task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-green-500'}`}>{task.status}</button></p>
        <p className='mt-2'><b className='mr-2'>Due Date:</b> {new Date(task.dueDate).toLocaleDateString()}</p>
    <Link to={`/task/update/${task._id}`}><button className='bg-amber-700 text-white px-5 py-1 mt-2'>Edit</button></Link>
    </div>
    </div>
  )
} 

export default Task
