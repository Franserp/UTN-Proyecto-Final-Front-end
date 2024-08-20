import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../Components/CreateNewChannel/styloFormNewChannel.css'
import { useParams } from 'react-router-dom'

/**
 * Renders a component that allows the user to create a new channel. 
 * 
 * The component consists of a button that, when clicked, toggles the visibility of a form. 
 * The form allows the user to enter a name for the new channel and submit it to the server using the handleSubmitNewChannel function. 
 * The component also receives the workspace_id from the URL and passes it to the handleSubmitNewChannel function.
 * 
 * @return {JSX.Element} The rendered component.
 */
const CreateNewChannel = () => {
    const { handleSubmitNewChannel, isMenuOpen, toggleMenu } = useGlobalContext()
    const { workspace_id } = useParams()

    return (
        <div>
            {(!isMenuOpen) &&
                <button className='btn' onClick={toggleMenu}>
                    Crear Canal
                </button>
            }

            {isMenuOpen && (
                <form onSubmit={(e) => handleSubmitNewChannel(e, workspace_id)}>
                    <label htmlFor="nombreCanal"></label>
                    <input type="text" name='nombreCanal' id='nombreCanal' placeholder='Nombre del canal' className='input-canal' required />
                    <div className='contenedor-btn'>
                    <button type='submit' className='btn'>Confirmar</button>
                    <button type='button' className='btn' onClick={toggleMenu}>Cancelar</button>
                    </div>
                    
                </form>
            )}
        </div>
    )
}

export default CreateNewChannel