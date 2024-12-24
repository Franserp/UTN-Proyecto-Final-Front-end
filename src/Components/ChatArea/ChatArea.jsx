
import { useContext } from 'react';
import MessageForm from '../MessageForm/MessageForm';
import Messages from '../Messages/Messages';


/**
 * Renders the chat area of the workspace.
 *
 * @param {Object} props - The props object.
 * @param {string} props.canal_id - The ID of the channel to display messages from.
 * @return {JSX.Element} The chat area component.
 */
const ChatArea = ({ canal_id }) => {
 
  return (
    <div className='chat-area'>
      <Messages  />
      <MessageForm canal_id={canal_id} />
    </div>
  );
};

export default ChatArea;
