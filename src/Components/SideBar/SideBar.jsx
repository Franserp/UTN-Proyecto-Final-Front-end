import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import CreateNewChannel from '../CreateNewChannel/CreateNewChannel'
import { Link } from 'react-router-dom'

/**
 * A component that renders a sidebar with a list of channels and a button to create a new channel.
 * @param {object} props - Props passed to the component.
 * @param {string} props.workspace_id - The ID of the workspace to list channels from.
 * @returns {ReactElement} - A JSX element representing the side bar.
 */
const SideBar = ({workspace_id}) => {
    const {channels, isOpen,} = useGlobalContext()
    
  return (
    <>
     <div className={`sidebar ${isOpen ? 'open' : ''}`}>
              <h4>Canales</h4>
              <nav className={`menu ${isOpen ? 'visible' : ''}`}>
                <ul>
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <Link to={`/workspace/${workspace_id}/${channel.id}`}>#{channel.name}</Link>
                  </li>
                ))}
                </ul>
                <CreateNewChannel/>
              </nav>
            </div>
    </>

  )
}

export default SideBar