
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../Context/GlobalContext';
import '../../styles/styles.css'

const WorkSpace = () => {
  const { workspace_id, canal_id } = useParams();

  const { fetchWorkSpace, fetchChannels, fetchMessages, workSpace, channels, messages, handleSubmitMessage, handleNavigateHome } = useGlobalContext();

  useEffect(() => {
    fetchWorkSpace(workspace_id);
  }, [workspace_id]);

  useEffect(() => {
    fetchChannels(workspace_id);
  }, [workspace_id]);

  useEffect(() => {
    fetchMessages(canal_id);
  }, [canal_id]);

  return (
    <>
      {
        workSpace ? (
          <nav className='nav'>
            <h1>{workSpace[0].name}</h1>
            <button className='btn' onClick={(e) => handleNavigateHome()}>Salir</button>
            
          </nav>
        )
          : (
            <p>Cargando...</p>
          )
      }

      <div className='workspace'>
        {workSpace ? (

          <>

            <div className='sidebar'>

            <h3>Canales</h3>

              <ul>
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <Link to={`/workspace/${workspace_id}/${channel.id}`}>#{channel.name}</Link>
                  </li>
                ))}
              </ul>
              <button className='create-channel-button'>Crear Nuevo Canal</button>
            </div>
            <div className='chat-area'>
              
              <div className='messages'>
                {messages.map((message) => (
                  <div key={message.id} className='message'>
                    <strong>{message.user}</strong>: {message.text}
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => handleSubmitMessage(e, canal_id)} className='message-form'>
                <label htmlFor="content"></label>
                <input type="text" name='contenido' id='contenido' placeholder='Escribe tu mensaje' />
                <button type='submit'>enviar</button>
              </form>
            </div>
          </>





        ) : (
          <p>Cargando...</p>
        )}
      </div>

    </>
  )

}
export default WorkSpace;
