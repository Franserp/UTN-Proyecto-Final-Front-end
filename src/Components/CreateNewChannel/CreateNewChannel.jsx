import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../Components/CreateNewChannel/styloFormNewChannel.css'
import { useParams } from 'react-router-dom'

const CreateNewChannel = () => {
    const { handleSubmitNewChannel, isMenuOpen, toggleMenu } = useGlobalContext()
    const { workspace_id } = useParams()

    return (
        <div>
            {(!isMenuOpen) &&
                <button onClick={toggleMenu}>
                    Crear Canal
                </button>
            }

            {isMenuOpen && (
                <form onSubmit={(e) => handleSubmitNewChannel(e, workspace_id)}>
                    <label htmlFor="nombreCanal"></label>
                    <input type="text" name='nombreCanal' id='nombreCanal' placeholder='Nombre del canal' required />
                    <button type='submit'>Confirmar</button>
                    <button type='button' onClick={toggleMenu}>Cancelar</button>
                </form>
            )}
        </div>
    )
}

export default CreateNewChannel