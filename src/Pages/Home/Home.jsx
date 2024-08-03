import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import ListaWorkSpaces from '../../Components/ListaWorkSpaces/ListaWorkSpaces'


const Home = () => {
  return (
    <div>
        <ListaWorkSpaces/>
    </div>
  )
}

export default Home