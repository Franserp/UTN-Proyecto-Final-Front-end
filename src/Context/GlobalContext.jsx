import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'
const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [workSpaces, setWorkSpaces] = useState([])
    const [workSpace, setWorkSpace] = useState(null)
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState([])

    const navigate = useNavigate()

    const fetchWorkSpaces = async () => {
        const response = await fetch('http://localhost:5000/workspaces')
        const data = await response.json()
        setWorkSpaces(data)

    }

    const fetchWorkSpace = async (workspaceId) => {
        const response = await fetch(`http://localhost:5000/workspaces?id=${workspaceId}`)
        const data = await response.json()
        setWorkSpace(data)

    }

    const fetchChannels = async (workspaceId) => {
        const response = await fetch(`http://localhost:5000/channels?workspaceId=${workspaceId}`)
        const data = await response.json()
        setChannels(data)
    }
    const fetchMessages = async (channelId) => {
        const response = await fetch(`http://localhost:5000/messages?channelId=${channelId}`)
        const data = await response.json()
        setMessages(data)
    }

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
        
        const response = await fetch('http://localhost:5000/messages',
            {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(nuevoMensaje)
            }
        )
        formulario.reset()
        const result = await response.json()
        setMessages((prevMessages) => [...prevMessages, result])

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
                handleSubmitMessage : handleSubmitMessage
            }


        }>
            {children}
        </GlobalContext.Provider>

    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}