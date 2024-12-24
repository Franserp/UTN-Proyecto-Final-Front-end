import React, { useEffect } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';


const Messages = () => {
    const { messages } = useGlobalContext();
    useEffect(() => {
        console.log('Mensajes actuales:', messages);
    }, [messages]);
    

    return (
        <div className='messages'>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className='message'>
                        <strong>{message.username}</strong>: {message.content}
                    </div>
                ))
            ) : (
                <p>No hay mensajes en este canal</p>
            )}
        </div>
    );
};

export default Messages;
