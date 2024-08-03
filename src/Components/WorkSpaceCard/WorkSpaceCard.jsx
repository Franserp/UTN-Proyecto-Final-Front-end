import React from 'react'

const WorkSpaceCard = ({workspace}) => {
  return (
    <div>
        <h3>{workspace.name}</h3>
            <p>{workspace.description}</p>
            <br />
    </div>
  )
}

export default WorkSpaceCard