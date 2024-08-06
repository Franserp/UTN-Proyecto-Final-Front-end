import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import ListaWorkSpaces from '../../Components/ListaWorkSpaces/ListaWorkSpaces'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <>
    <div>
        <ListaWorkSpaces/>
    </div>
    <div>
      <Link to={'/workspace/new'}>Crear Nuevo WorkSpace</Link>
    </div>
    </>
    
  )
}

export default Home