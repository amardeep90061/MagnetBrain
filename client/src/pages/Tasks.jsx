import React from 'react'
import Task from '../components/task'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Tasks = () => {
    const [data, setData] = React.useState([])

    const statusOrder = {
    'pending': 1,
    'in-progress': 2,
    'completed': 3,
};

const sortedTasks = data.slice().sort((a, b) => {
    const priorityA = statusOrder[a.status] || 99;
    const priorityB = statusOrder[b.status] || 99;
    return priorityA - priorityB;
});

    const getAllTasks = async() => {
        try {
            const response = await fetch('https://magnet-brain-la6388ra6-amardeep-prajapatis-projects.vercel.app/api/tasks', {   
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':localStorage.getItem('token')
                },
            });
            const data = await response.json();
            setData(data);
            console.log(data);
        }
        catch (error) {
            console.error('Error fetching tasks:', error);
        }

    }
    React.useEffect(() => {
        getAllTasks();
    }, []);

  return (
    <div className='p-4'>
      <Navbar/>
      <h2  className='p-4 text-2xl ml-4'>All Tasks are here: </h2>
      <div className='flex flex-wrap gap-5'>
        {
        sortedTasks.map((task,index) => (
            <Task key={index} task={task}/>
        ))
      }
      </div>
      <Footer/>
    </div>
  )
}

export default Tasks
