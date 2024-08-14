import React from 'react'
import '../../styles/styles.css'

import FormNewWs from '../../Components/FormNewWS/FormNewWs'

const NewWorkSpace = () => {
  return (
    <div className='contenedor'>
      <h1>Crea Un nuevo WorkSpace</h1>
      <FormNewWs/>
    </div>


  )
}

export default NewWorkSpace