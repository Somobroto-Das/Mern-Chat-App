import {Navigate,Route,Routes} from 'react-router-dom';
import './App.css'
import Home from './pages/Home/home.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/signup/signup.jsx';
import {Toaster} from 'react-hot-toast';
import { UseAuthContext } from './Context/authcontext.jsx';

function App() {
  const {authUser}=UseAuthContext();
  return (<div className='p-4 h-screen flex items-center justify-center'>
    <Routes>
    <Route path='/' element={authUser ? <Home/>:<Navigate to='/login'/>}/>
    <Route path='/login' element={authUser ? <Navigate to='/' /> :<Login/>}/>
    <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />}/>
    </Routes>
    <Toaster/>
  </div>
  )
}

export default App
