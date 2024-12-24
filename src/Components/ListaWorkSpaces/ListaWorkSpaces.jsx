import React, { useEffect } from 'react'
import WorkSpaceCard from '../WorkSpaceCard/WorkSpaceCard';
import { useGlobalContext } from '../../Context/GlobalContext';

import '../../styles/styles.css'
import UserButton from '../UserButton/UserButton';


/**
 * Renders a list of WorkSpaces using the WorkSpaceCard component
 *
 * @returns {JSX.Element} - The rendered list of WorkSpaces
 */
const ListaWorkSpaces = () => {
  const { workSpaces, fetchWorkSpaces } = useGlobalContext()
  useEffect(() => {
    fetchWorkSpaces();
  }, [])

  return (
    <div >
      <div>
      <UserButton />
      <h1>WorkSpaces list</h1>
      </div>
      <div className='contenedor_cartas'>
        {workSpaces.map(workspace =>
          <WorkSpaceCard key={workspace.id} workspace={workspace} />
        )}
      </div>
    </div>
  )
}

export default ListaWorkSpaces