import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import ListaWorkSpaces from '../../Components/ListaWorkSpaces/ListaWorkSpaces'
import '../../styles/styles.css'


const Home = () => {
  const {handleNavigateNws} = useGlobalContext()
  return (
    <div className='contenedor'>
      <div>
        <ListaWorkSpaces />
      </div>
      <div >
        <button className='btn btn-crear-ws' onClick={handleNavigateNws}>Crear Nuevo WorkSpace</button>
      </div>
    </div>



  )
}

export default Home