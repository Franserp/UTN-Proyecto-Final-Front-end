import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import ListaWorkSpaces from '../../Components/ListaWorkSpaces/ListaWorkSpaces'
import { Link } from 'react-router-dom'
import '../../styles/styles.css'


const Home = () => {
  return (
    <div className='contenedor'>
      <div>
        <ListaWorkSpaces />
      </div>
      <div>
        <Link to={'/workspace/new'}>Crear Nuevo WorkSpace</Link>
      </div>
    </div>



  )
}

export default Home