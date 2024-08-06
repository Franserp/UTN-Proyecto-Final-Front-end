
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../Context/GlobalContext';

const WorkSpace = () => {
  const {workspace_id, canal_id} = useParams();
  
  const { fetchWorkSpace, fetchChannels, fetchMessages, workSpace, channels, messages, handleSubmitMessage } = useGlobalContext();

  useEffect(() => {
    fetchWorkSpace(workspace_id);
  }, [workspace_id]);

  useEffect(() => {
    fetchChannels(workspace_id);
  }, [workspace_id]);

  useEffect(() => { 
    fetchMessages(canal_id);
  }, [canal_id]);
  console.log()
  return (
    <div>
    {workSpace ? (
      <>
        <Link to={'/'}>Volver</Link>
        <h1>{workSpace[0].name}</h1>
        <div>
          {channels.map((channel) => (
            <div key={channel.id}>
              <Link to={`/workspace/${workspace_id}/${channel.id}`}>{channel.name}</Link>
            </div>
          ))}
        </div>
        <div>
          <h2>Mensajes del Canal</h2>
          {messages.map((message) => (
            <div key={message.id}>
              <strong>{message.user}</strong>: {message.text}
            </div>
          ))}
          <form onSubmit={(e) => handleSubmitMessage(e, canal_id)}>
            <label htmlFor="content"></label>
            <input type="text" name='contenido' id='contenido'/>
            <button type='submit'></button>
          </form>
        </div>
      </>
    ) : (
      <p>Cargando...</p>
    )}
  </div>
  )
    
}    
export default WorkSpace;
