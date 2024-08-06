import React from 'react'
import { Link } from 'react-router-dom'

const NewWorkSpace = () => {
  return (
    <>
    <h1>Crea Un nuevo WorkSpace</h1>
    <div>
      <form>
        <label htmlFor="nombre"></label>
        <input type="text" name='nombreNuevoWs' id='nombreNuevoWs'/>
        <label htmlFor="nombreCanal"></label>
        <input type="text" name='nombreCanal' id='NombreCanal'/>
        <button type='submit'>Crear WorkSpace</button>
        <Link to={'/'}><button>Cancelar</button></Link>
      </form>
      
    </div>
    </>
  )
}

export default NewWorkSpace