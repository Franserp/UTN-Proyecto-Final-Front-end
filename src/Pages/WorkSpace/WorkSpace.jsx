
import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../Context/GlobalContext';

const WorkSpace = () => {
  const {workspace_id, canal_id} = useParams();
  
  const { fetchWorkSpace, fetchChannels, fetchMessages, workSpace, channels, messages } = useGlobalContext();

  useEffect(() => {
    fetchWorkSpace(workspace_id);
  }, []);

  useEffect(() => {
    fetchChannels(workspace_id);
  }, []);

  useEffect(() => {
    fetchMessages(canal_id);
  }, [canal_id]);
  
  return (
    <div>
    {workSpace ? (
      <>
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
        </div>
      </>
    ) : (
      <p>Cargando...</p>
    )}
  </div>
  )
    
}    
export default WorkSpace;
