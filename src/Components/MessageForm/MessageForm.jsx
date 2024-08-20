import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'

/**
 * A component that renders a form for submitting a new message.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.canal_id - The ID of the channel to send the message to.
 * @return {JSX.Element} The rendered MessageForm component.
 */
const MessageForm = ({canal_id}) => {
    const { handleSubmitMessage } = useGlobalContext()
  return (
    <div>
        <form onSubmit={(e) => handleSubmitMessage(e, canal_id)} className='message-form'>
                <label htmlFor="content"></label>
                <input type="text" name='contenido' id='contenido' placeholder='Escribe tu mensaje' required/>
                <button type='submit'>enviar</button>
              </form>
    </div>
  )
}

export default MessageForm