import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                fetchMessages: fetchMessages
            }


        }>
            {children}
        </GlobalContext.Provider>

    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}