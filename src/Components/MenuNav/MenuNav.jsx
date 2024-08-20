import React from 'react'
import { useGlobalContext } from '../../Context/GlobalContext'

/**
 * Renders the navigation menu at the top of the app.
 * 
 * This component receives the global state and dispatch functions through the
 * useGlobalContext hook. It displays the name of the current workspace and a
 * button to toggle the sidebar menu. It also has a "Salir" (logout) button which
 * calls the handleNavigateHome function to navigate back to the home page.
 * 
 * @return {JSX.Element} The navigation menu JSX.
 */
const MenuNav = () => {
    const {workSpace, toggleMenuT, handleNavigateHome} = useGlobalContext()
    return (
        <>
            <nav className='nav'>
                <h1>{workSpace.name}</h1>

                <div className="nav-buttons">
                    <button className="menu-toggle" onClick={toggleMenuT}>
                        ☰
                    </button>
                    <button className='btn btn-salir' onClick={(e) => handleNavigateHome()}>Salir</button>


                </div>

            </nav>
        </>
    )
}

export default MenuNav