import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../FormNewWS/StyleForm.css'

const FormNewWs = () => {
    const { handleSubmitNews, handleNavigateHome } = useGlobalContext()
    return (
        <div className='contenedor-form'>
            <form onSubmit={(e) => handleSubmitNews(e)} className="form-container">
                <div className="input-group">
                    <label htmlFor="nombreNuevoWs">Nombre del WorkSpace</label>
                    <input type="text" name='nombreNuevoWs' id='nombreNuevoWs' required />
                </div>
                <div className="input-group">
                    <label htmlFor="nombreCanal">Nombre del Canal</label>
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