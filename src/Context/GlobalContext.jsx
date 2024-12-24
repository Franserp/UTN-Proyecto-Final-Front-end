import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [workSpaces, setWorkSpaces] = useState([])
    const [workSpace, setWorkSpace] = useState(null)
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);


    const navigate = useNavigate()

   
    const fetchWorkSpaces = async () => {
        const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/workspaces', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include', 
        })
            .then((response) => {
              
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json(); 
            })
            .then((data) => {
                console.log('Datos recibidos:', data); 
             
                setWorkSpaces(data); 
            })
            .catch((error) => {
                console.error('Error en el fetch:', error.message); 
           
                setWorkSpaces([]); 
            });

    }

   
    const fetchWorkSpace = async (workspaceId) => {
        try {
            const response = await fetch(`https://back-end-proyecto-final-production.up.railway.app/api/workspaces/${workspaceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
                },
                credentials: 'include', 
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const workspace = data

            console.log(workspace); 
            setWorkSpace(workspace);

        } catch (error) {
            console.error('Error fetching workspace:', error);
        }

    }

    
    const fetchChannels = async (workspaceId) => {
        try {
            const response = await fetch(`https://back-end-proyecto-final-production.up.railway.app/api/channels/workspace/${workspaceId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
                },
                credentials: 'include', 
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const channels = data

           
            setChannels(channels);

        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };
   
    const fetchMessages = async (channelId) => {
        
        try {
            const response = await fetch(`https://back-end-proyecto-final-production.up.railway.app/api/channel/${channelId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
                    
                },
               
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const messages = await response.json();
            
            setMessages(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            
        }
    };


    const fetchUserById = async (userId) => {
        try {
            const response = await fetch(`https://back-end-proyecto-final-production.up.railway.app/api/users/${userId}`, {
                method: 'GET',
                credentials: 'include', 
            });
            if (!response.ok) {
                throw new Error('Error fetching user data');
            }
            const user = await response.json();
            setUser(user);
            return user; 
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };



const handleSubmitMessage = async (e, canal_id) => {
    e.preventDefault();

    const formulario = e.target;
    const datosFormulario = new FormData(formulario);
    const contenido = datosFormulario.get('contenido');

    if (!contenido || !canal_id) {
        console.error('Contenido o canal ID faltantes');
        return;
    }

    const nuevoMensaje = {
        channel_id: Number(canal_id),
        content: contenido,
    };

    try {
      
        const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/messages', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
            },
            body: JSON.stringify(nuevoMensaje),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error en el POST: ${response.status} - ${errorMessage}`);
        }

        const savedMessage = await response.json();

      
        const updatedMessagesResponse = await fetch(`https://back-end-proyecto-final-production.up.railway.app/api/messages?channelId=${canal_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
            },
            credentials: 'include',
        });

        if (!updatedMessagesResponse.ok) {
            const errorMessage = await updatedMessagesResponse.text();
            throw new Error(`Error al obtener mensajes actualizados: ${updatedMessagesResponse.status} - ${errorMessage}`);
        }

        const updatedMessages = await updatedMessagesResponse.json();

    
        setMessages(updatedMessages.filter(message => message.channel_id === Number(canal_id)));

   
        formulario.reset();

        console.log('Mensaje enviado y mensajes actualizados correctamente');
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
};



    
    const handleSubmitNews = async (e) => {
        e.preventDefault();
    
        const formulario = e.target;
        const datosFormularios = new FormData(formulario);
    
        
        const nuevoWorkSpace = {
            name: datosFormularios.get('nombreNuevoWs'), 
        };
    
        try {
            
            const responseWorkspace = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/workspaces', { 
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoWorkSpace),
            });
    
            if (!responseWorkspace.ok) {
                const errorMessage = await responseWorkspace.text();
                throw new Error(`Error creando workspace: ${responseWorkspace.status} - ${errorMessage}`);
            }
    
            const createdWorkspace = await responseWorkspace.json();
    
           
            const nuevoCanal = {
                workspace_id: createdWorkspace.id, 
                name: datosFormularios.get('nombreCanal'),
            };
    
            const responseChannel = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/channels', { // Cambiar URL en producción
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCanal),
            });
    
            if (!responseChannel.ok) {
                const errorMessage = await responseChannel.text();
                throw new Error(`Error creando canal: ${responseChannel.status} - ${errorMessage}`);
            }
    
            const createdChannel = await responseChannel.json();
    
       
            setWorkSpaces((prev) => [...prev, createdWorkspace]);
            setChannels((prev) => [...prev, createdChannel]);
    
        
            formulario.reset();
            navigate(`/home`);
        } catch (error) {
            console.error('Error al crear workspace o canal:', error);
        }
    };
    

   
    const handleSubmitNewChannel = async (e, workspaceId) => {
        e.preventDefault();
    
        const formulario = e.target;
        const datosFormulario = new FormData(formulario);
    
       
        const nuevoCanal = {
            workspace_id: workspaceId, 
            name: datosFormulario.get('nombreCanal'),
        };
    
        try {
           
            const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/channels', { 
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoCanal),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error creando canal: ${response.status} - ${errorMessage}`);
            }
    
            const createdChannel = await response.json();
    
           
            setChannels((prevChannels) => [...prevChannels, createdChannel]);
    
           
            setIsMenuOpen((prevState) => !prevState);
            navigate(`/workspace/${workspaceId}/${createdChannel.id}`);
    
        } catch (error) {
            console.error('Error al crear el canal:', error);
        }
    };
    const handleNavigateHome = () => {
        navigate('/home')
    }

    const handleNavigateLogin = () => {
        navigate('/')
    }
    const handleLogout = async () => {
        try {
            const response = await fetch('https://back-end-proyecto-final-production.up.railway.app/api/logout', {
                method: 'GET', 
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error en el cierre de sesión: ${response.statusText}`);
            }
    
            
            localStorage.removeItem('userId');
    
           
           handleNavigateLogin() 
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };


    
    const handleNavigateNws = () => {
        navigate('/workspace/new')
    }

    
    


    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }


    
    const toggleMenuT = () => {
        setIsOpen(!isOpen);
    }

    return (
        <GlobalContext.Provider value={
            {
                workSpaces: workSpaces,
                channels: channels,
                messages: messages,
                workSpace: workSpace,
                fetchWorkSpace: fetchWorkSpace,
                fetchWorkSpaces: fetchWorkSpaces,
                fetchChannels: fetchChannels,
                fetchMessages: fetchMessages,
                handleSubmitMessage: handleSubmitMessage,
                handleSubmitNews: handleSubmitNews,
                handleNavigateNws: handleNavigateNws,
                navigate: navigate,
                handleNavigateHome: handleNavigateHome,
                handleSubmitNewChannel: handleSubmitNewChannel,
                isMenuOpen: isMenuOpen,
                toggleMenu: toggleMenu,
                toggleMenuT: toggleMenuT,
                setIsOpen: setIsOpen,
                isOpen: isOpen,
                fetchUserById: fetchUserById,
                isUserInfoVisible: isUserInfoVisible,
                setIsUserInfoVisible: setIsUserInfoVisible,
                user: user,
                handleLogout: handleLogout,
                handleNavigateLogin: handleNavigateLogin


            }


        }>
            {children}
        </GlobalContext.Provider>

    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext)
}