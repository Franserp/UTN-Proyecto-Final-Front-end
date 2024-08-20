import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../styles/styles.css'

/**
 * WorkSpaceCard component.
 *
 * This component renders a card with the name, description and a button to enter a workspace.
 *
 * @param {Object} workspace - The workspace data.
 * @param {string} workspace.name - The name of the workspace.
 * @param {string} workspace.description - The description of the workspace.
 * @param {number} workspace.id - The ID of the workspace.
 * @param {number} workspace.idCanalPred - The ID of the default channel of the workspace.
 * @return {JSX.Element} The component.
 */
const WorkSpaceCard = ({ workspace }) => {
  const { navigate } = useGlobalContext()
  /**
   * Handles the click event on the "Entrar" button.
   *
   * Navigates to the workspace with the given ID and default channel ID.
   *
   * @param {Object} workspace - The workspace data.
   * @param {number} workspace.id - The ID of the workspace.
   * @param {number} workspace.idCanalPred - The ID of the default channel of the workspace.
   */
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