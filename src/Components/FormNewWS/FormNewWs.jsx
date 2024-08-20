import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../FormNewWS/StyleForm.css'

/**
 * Component for creating a new WorkSpace.
 * 
 * This component renders a form that allows the user to input a name for a new WorkSpace.
 * The form also includes a field for inputting a name for a new channel.
 * When the form is submitted, the handleSubmitNews function from the global context is called.
 * The form also includes a cancel button that calls the handleNavigateHome function from the global context.
 * 
 * @return {JSX.Element} Returns a JSX element containing the form for creating a new WorkSpace.
 */
const FormNewWs = () => {
    const { handleSubmitNews, handleNavigateHome } = useGlobalContext()
    return (
        <div className='contenedor-form'>
            <form onSubmit={(e) => handleSubmitNews(e)} className="form-container">
                <div className="input-group">
                    <label htmlFor="nombreNuevoWs" className='label'>Nombre del WorkSpace</label>
                    <input type="text" name='nombreNuevoWs' id='nombreNuevoWs' required />
                </div>
                <div className="input-group">
                    <label htmlFor="nombreCanal" className='label'>Nombre del Canal</label>
                    <input type="text" name='nombreCanal' id='NombreCanal' required />
                </div>
                <div className="button-group">
                    <button type='submit' className='btn btn-submit'>Crear WorkSpace</button>
                    <button className='btn btn-cancelar' onClick={handleNavigateHome}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}

export default FormNewWs