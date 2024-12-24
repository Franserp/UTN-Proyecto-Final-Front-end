import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import NewWorkSpace from './Pages/NewWorkspace/NewWorkSpace'
import WorkSpace from './Pages/WorkSpace/WorkSpace'
import RegisterForm from './Components/RegisterForm/RegisterForm'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='/register' element={<RegisterForm/>}></Route>
    <Route path='/home' element={<Home/>}></Route>
    <Route path='/workspace/new' element={<NewWorkSpace/>}></Route>
    <Route path='/workspace/:workspace_id/:canal_id' element={<WorkSpace/>}></Route>
   </Routes>
  )
}

export default App
