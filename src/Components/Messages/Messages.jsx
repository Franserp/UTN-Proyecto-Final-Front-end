import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'


/**
 * Renders a list of messages in a container.
 *
 * @return {JSX.Element} A container with a list of messages.
 */
const Messages = () => {
    const { messages } = useGlobalContext()
    return (
        <div className='messages'>
            {messages.map((message) => (
                <div key={message.id} className='message'>
                    <strong>{message.user}</strong>: {message.text}
                </div>
            ))}
        </div>
    )
}

export default Messages