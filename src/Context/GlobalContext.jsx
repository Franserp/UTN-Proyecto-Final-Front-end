import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [workSpaces, setWorkSpaces] = useState([])
    const [workSpace, setWorkSpace] = useState(null)
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)


    const navigate = useNavigate()

    /**
     * Fetches all workspaces from the server and updates the state.
     */
    const fetchWorkSpaces = async () => {
        const response = await fetch('https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509')
        const data = await response.json()
        setWorkSpaces(data.record.workspaces)

    }

    /**
     * Fetches a single workspace from the server by its ID and updates the state.
     * @param {string} workspaceId - The ID of the workspace to fetch.
     */
    const fetchWorkSpace = async (workspaceId) => {
        const response = await fetch(`https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509`)
        const data = await response.json()
        const workspace = await data.record.workspaces.find(workspace => workspace.id === workspaceId)
        console.log(workspace)
        setWorkSpace(workspace)

    }

    /**
     * Fetches all channels from the server by the given workspaceId and updates the state.
     * @param {string} workspaceId - The ID of the workspace to fetch channels from.
     */
    const fetchChannels = async (workspaceId) => {
        const response = await fetch(`https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509`)
        const data = await response.json()
        const channels = await data.record.channels.filter(channel => String(channel.workspaceId) === String(workspaceId))
        console.log(channels)
        setChannels(channels)
    }
    /**
     * Fetches all messages from the server by the given channelId and updates the state.
     *
     * @param {string} channelId - The ID of the channel to fetch messages from.
     * @return {Promise<void>} - A Promise that resolves when the messages are fetched and the state is updated.
     */
    const fetchMessages = async (channelId) => {
        const response = await fetch(`https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509`)
        const data = await response.json()
        const messages = await data.record.messages.filter(message => String(message.channelId) === String(channelId))
        setMessages(messages)
    }

    /**
     * Handles form submission for sending a new message.
     *
     * @param {Event} e - The form submission event.
     * @param {string} canal_id - The ID of the channel to send the message to.
     * @return {Promise<void>} - A Promise that resolves when the message is successfully sent and the messages state is updated.
     */
    const handleSubmitMessage = async (e, canal_id) => {
        e.preventDefault()
        const nuevoMensaje = {
            id: '',
            channelId: canal_id,
            user: 'yo',
            text: ''
        }
        const formulario = e.target
        const datosFormularios = new FormData(formulario)
        nuevoMensaje['text'] = datosFormularios.get('contenido')
        nuevoMensaje['id'] = uuidv4()

        const response = await fetch('https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509')
        const data = await response.json()
        const updatedMessages = [...data.record.messages, nuevoMensaje]
        const newResponse = await fetch(`https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ record: { messages: updatedMessages } })
        })

        const responseData = await newResponse.json();
        console.log(responseData)

        formulario.reset()
        setMessages(updatedMessages.filter(message => String(message.channelId) === String(canal_id)))

    }

    /**
     * Handles form submission for creating a new workspace.
     * Sends a POST request to the server to create the workspace and channel.
     * Updates the workspaces and channels states.
     * Navigates to the newly created workspace.
     *
     * @param {Event} e - The form submission event.
     * @return {Promise<void>} - A Promise that resolves when the workspace and channel are successfully created and the states are updated.
     */
    const handleSubmitNews = async (e) => {
        e.preventDefault()
        const formulario = e.target
        const datosFormularios = new FormData(formulario)
        const nuevoWorkSpace = {
            id: uuidv4(),
            name: datosFormularios.get('nombreNuevoWs'),
            idCanalPred: uuidv4()

        }
        const nuevoCanal = {
            id: nuevoWorkSpace.idCanalPred,
            workspaceId: nuevoWorkSpace.id,
            name: datosFormularios.get('nombreCanal')
        }

        const response = await fetch('https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509')
        const data = await response.json()
        const updatedWorkspaces = [...data.record.workspaces, nuevoWorkSpace]
        const updatedChannels = [...data.record.channels, nuevoCanal]

        await fetch(`https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ record: { workspaces: updatedWorkspaces, channels: updatedChannels } })
        })

        formulario.reset()
        setWorkSpaces(updatedWorkspaces)
        setChannels(updatedChannels)
        navigate(`/`)
    }
    /**
     * Handles form submission for creating a new channel.
     * Sends a POST request to the server to create the channel.
     * Updates the channels state.
     * Navigates to the newly created channel.
     *
     * @param {Event} e - The form submission event.
     * @param {string} workspaceId - The ID of the workspace to create the channel in.
     * @return {Promise<void>} - A Promise that resolves when the channel is successfully created and the states are updated.
     */
    const handleSubmitNewChannel = async (e, workspaceId) => {
        e.preventDefault()
        const formulario = e.target
        const datosFormulario = new FormData(formulario)
        const nuevoCanal = {
            id: uuidv4(),
            workspaceId: workspaceId,
            name: datosFormulario.get('nombreCanal')
        }

        const response = await fetch('https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509')
        const data = await response.json()

        const updatedChannels = [...data.record.channels, nuevoCanal]
        const responseChannel = await fetch('https://api.jsonbin.io/v3/b/66c3ce96e41b4d34e4229509',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedChannels)
            }
        )

        const resultCanal = await responseChannel.json()
        setChannels((prevChannels) => [...prevChannels, resultCanal])
        setIsMenuOpen(prevState => !prevState)
        navigate(`/workspace/${workspaceId}/${nuevoCanal.id}`)
    }

    /**
     * Navigates to the page for creating a new workspace.
     *
     * @return {void} This function does not return anything.
     */
    const handleNavigateNws = () => {
        navigate('/workspace/new')
    }

    /**
     * Navigates the user to the home page.
     *
     * This function does not take any parameters and does not return anything.
     */
    const handleNavigateHome = () => {
        navigate('/')
    }


    /**
     * Toggles the state of the sidebar menu to open or close.
     *
     * This function does not take any parameters and does not return anything.
     */
    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }


    /**
     * Toggles the state of the menu to open or close.
     *
     * This function does not take any parameters and does not return anything.
     */
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
                isOpen: isOpen


            }


        }>
            {children}
        </GlobalContext.Provider>

    )
}

/**
 * Retrieves the global context object from the Context API.
 *
 * @return {object} The global context object.
 */
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}