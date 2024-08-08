import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../styles/styles.css'

const WorkSpaceCard = ({ workspace }) => {
  const { navigate } = useGlobalContext()
  const handleClick = (workspace) => {
    navigate(`/workspace/${workspace.id}/${workspace.idCanalPred}`);
  }
  return (
    <div className='contenedor_workspace'>
      <h3>{workspace.name}</h3>
      <p>{workspace.description}</p>
      <button onClick={(e) => handleClick(workspace)} className='btn boton-derecha'>Entrar</button>
      <br />
    </div>
  )
}

export default WorkSpaceCard