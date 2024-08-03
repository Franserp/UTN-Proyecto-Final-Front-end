import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import NewWorkSpace from './Pages/NewWorkspace/NewWorkSpace'
import WorkSpace from './Pages/WorkSpace/WorkSpace'

function App() {

  return (
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/workspace/new' element={<NewWorkSpace/>}></Route>
    <Route path='/workspace/:workspace_id/:canal_id' element={<WorkSpace/>}></Route>
   </Routes>
  )
}

export default App
