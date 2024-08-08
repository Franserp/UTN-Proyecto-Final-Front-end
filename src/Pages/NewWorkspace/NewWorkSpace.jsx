import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../Context/GlobalContext'
import '../../styles/styles.css'

const NewWorkSpace = () => {
  const { handleSubmitNews } = useGlobalContext()
  return (
    <div className='contenedor'>
      <h1>Crea Un nuevo WorkSpace</h1>
      <div >
        <form onSubmit={(e) => handleSubmitNews(e)} className="form-container">
          <div className="input-group">
            <label htmlFor="nombreNuevoWs">Nombre del WorkSpace</label>
            <input type="text" name='nombreNuevoWs' id='nombreNuevoWs' />
          </div>
          <div className="input-group">
            <label htmlFor="nombreCanal">Nombre del Canal</label>
            <input type="text" name='nombreCanal' id='NombreCanal' />
          </div>
          <div className="button-group">
            <button type='submit' className='btn'>Crear WorkSpace</button>
            <Link to={'/'} ><button className='btn'>Cancelar</button></Link>
          </div>
        </form>

      </div>
    </div>


  )
}

export default NewWorkSpace