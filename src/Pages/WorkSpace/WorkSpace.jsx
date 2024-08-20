
import React, { useEffect } from 'react'
import { useParams, } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../styles/styles.css'
import './styloSidebar.css'
import MenuNav from '../../Components/MenuNav/MenuNav'
import SideBar from '../../Components/SideBar/SideBar'
import ChatArea from '../../Components/ChatArea/ChatArea'

/**
 * Renders the workspace page, which contains the MenuNav, SideBar and ChatArea components.
 *
 * The component fetches the workspace data from the server when the workspace_id URL parameter changes.
 * It also fetches the channels and messages from the server when the workspace_id and canal_id URL parameters change respectively.
 *
 * If the workspace data has not been fetched yet, it renders a "Cargando..." message.
 *
 * @return {JSX.Element} The rendered workspace page.
 */
const WorkSpace = () => {
  const { workspace_id, canal_id } = useParams();

  const { fetchWorkSpace, fetchChannels, fetchMessages, workSpace } = useGlobalContext();

  useEffect(() => {
    fetchWorkSpace(workspace_id);
  }, [workspace_id]);

  useEffect(() => {
    fetchChannels(workspace_id);
  }, [workspace_id]);

  useEffect(() => {
    fetchMessages(canal_id);
  }, [canal_id]);


  ;
  return (
    <>
      {
        workSpace ? (
          <>
            <MenuNav />
            <div className='workspace'>
              <>
                <SideBar workspace_id={workspace_id} />
                <ChatArea canal_id={canal_id} />
              </>
            </div>
          </>

        )
          : (
            <p>Cargando...</p>
          )
      }
    </>
  )

}
export default WorkSpace;
