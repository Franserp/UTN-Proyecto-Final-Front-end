import React, { useEffect } from 'react'
import WorkSpaceCard from '../WorkSpaceCard/WorkSpaceCard';
import { useGlobalContext } from '../../Context/GlobalContext';

const ListaWorkSpaces = () => {
  const { workSpaces, fetchWorkSpaces } = useGlobalContext()
  useEffect(() => {
    fetchWorkSpaces();
  }, [])

  return (
    <div>
      <h1>WorkSpaces list</h1>
      <div>
        {workSpaces.map(workspace =>
          <WorkSpaceCard key={workspace.id} workspace={workspace} />
        )}
      </div>
    </div>
  )
}

export default ListaWorkSpaces