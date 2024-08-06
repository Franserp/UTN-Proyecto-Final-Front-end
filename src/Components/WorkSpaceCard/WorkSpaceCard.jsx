import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'

const WorkSpaceCard = ({workspace}) => {

  return (
    <div>
        <h3>{workspace.name}</h3>
            <p>{workspace.description}</p>
            <Link to={`/workspace/${workspace.id}/1`}>Entrar</Link>
            <br />
    </div>
  )
}

export default WorkSpaceCard