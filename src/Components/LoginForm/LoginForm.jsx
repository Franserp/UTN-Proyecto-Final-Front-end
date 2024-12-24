import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'
import { Link } from 'react-router-dom'


const LoginForm = () => {
    const {handleNavigateHome} = useGlobalContext()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const validate = () => {
        const errors = {};
        if (!email.includes('@')) { errors.email = 'Correo electrónico inválido'; }
        if (password.length < 6) { errors.password = 'La contraseña debe tener al menos 6 caracteres'; }
        return errors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/login',
                    {
                        method: 'POST', headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify({ email, password }),
                        credentials: 'include',
                    });
                if (!response.ok) { throw new Error('Error en la solicitud'); }
                const data = await response.json();
                const userId = data.userId;
                localStorage.setItem('userId', userId)
                alert('Formulario enviado exitosamente: ' + JSON.stringify(data));
                handleNavigateHome()
            }
            catch (error) { alert('Error: ' + error.message); }
        }
        else { setErrors(validationErrors); }
        
    };

    
    return (
        <div className='contenedor-form'>
            <form onSubmit={(e) => handleSubmit(e)} className='form-container'>
                <h2>Iniciar Sesión</h2>
                <div className='input-group'>
                    <label htmlFor='loginEmail' className='label'>Correo Electrónico</label>
                    <input type='email' id='loginEmail' name='email' onChange={e => setEmail(e.target.value)} required />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div className='input-group'>
                    <label htmlFor='loginPassword' className='label'>Contraseña</label>
                    <input type='password' id='loginPassword' name='password' onChange={e => setPassword(e.target.value)} required />
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div >
                    <button type='submit' className='btn btn-submit'>Iniciar Sesión</button>
                    <h4>
                        No tienes cuenta?
                    </h4>
                    <Link to='/register' className='btn btn-derecha'>Registrarme</Link>
                    
                        
                </div>
            </form>
        </div>
    )
}

export default LoginForm