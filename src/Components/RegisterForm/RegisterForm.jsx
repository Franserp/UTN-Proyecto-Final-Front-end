import React, { useState } from 'react';
import { useGlobalContext } from '../../Context/GlobalContext';

const RegisterForm = () => {

    const { handleNavigateLogin } = useGlobalContext()	
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/users', { // Cambia la URL según tu backend
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en el registro');
            }

            const data = await response.json();
            console.log('Usuario registrado con éxito:', data);
            alert('Registro exitoso');
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            handleNavigateLogin()
        } catch (error) {
            console.error('Error al registrar:', error);
            alert('Hubo un problema con el registro.');
        }
    };

    return (
        <div className='contenedor-form'>
            <form onSubmit={handleSubmit} className='form-container'>
            <div className='input-group'>
                <label htmlFor="username" className='label'>Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='input-group'>
                <label className='label' htmlFor="email">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='input-group'>
                <label className='label' htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='input-group'>
                <label  className='label' htmlFor="confirmPassword">Confirmar contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className='btn btn-submit' type="submit">Registrarse</button>
        </form>

            </div>

        
    );
};

export default RegisterForm;
