import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
   <Routes>
    <Route path='./' element={<Home/>}></Route>
    <Route path='./workspace/new' element={<NewWorkSpace/>}></Route>
    <Route path='./workspace/:workspace_id/:canal_id' element={<WorkSpace/>}></Route>
   </Routes>
  )
}

export default App
