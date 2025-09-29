import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navigate, Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TaskCreation from './pages/TaskCreation'
import Tasks from './pages/Tasks'
import TaskUpdateForm from './pages/TaskUpdateForm'
import RefreshHandler from './RefreshHandler'

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const PrivateRoute=({element})=>{
    if (isLoading) {
            return <div>Loading session...</div>; 
        }
    return isAuthenticated?element:<Navigate to='/login'/>
  }

  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading}/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/taskCreate' element={<PrivateRoute element={<TaskCreation/>}/>}/>
      <Route path='/tasks' element={<PrivateRoute element={<Tasks/>}/>}/>
      <Route path='/task/update/:id' element={<PrivateRoute element={<TaskUpdateForm/>}/>} /> 
    </Routes>
    </>
  )
}

export default App
