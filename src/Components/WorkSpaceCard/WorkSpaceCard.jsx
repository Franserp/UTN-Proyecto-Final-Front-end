import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../styles/styles.css'

const WorkSpaceCard = ({workspace}) => {

  return (
    <div className='contenedor_workspace'>
        <h3>{workspace.name}</h3>
            <p>{workspace.description}</p>
            <Link to={`/workspace/${workspace.id}/${workspace.idCanalPred}`}>Entrar</Link>
            <br />
    </div>
  )
}

export default WorkSpaceCard