import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useGlobalContext } from '../../Context/GlobalContext'
import './styleUserButton.css'

const UserButton = () => {
    const { isUserInfoVisible, setIsUserInfoVisible, fetchUserById, user, handleLogout } = useGlobalContext()
    const userId = localStorage.getItem('userId')
    useEffect(() => {
       fetchUserById(userId);

      }, [])
    
    
    const toggleUserInfo = () => {
        setIsUserInfoVisible(!isUserInfoVisible);
    };
    return (
        <div className='user-container' >
            <button
                onClick={toggleUserInfo}
                className='user-button'
            >
                <FaUser style={{ marginRight: '8px' }} /> 
            </button>

            {isUserInfoVisible && (
                <div className='user-menu'
                   
                >
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button className='btn' onClick={handleLogout}>Cerrar sesión</button>
                </div>
            )}

        </div>
    )

}

export default UserButton