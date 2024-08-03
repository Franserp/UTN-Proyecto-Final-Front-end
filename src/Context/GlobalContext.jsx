import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
    const [workSpaces, setWorkSpaces] = useState([])
    const [channels, setChannels] = useState([])
    const [messeges, setMesseges] = useState([])
    const navigate = useNavigate()

    const fetchWorkSpaces = async () => {
        const response = await fetch('http://localhost:5000/workspaces')
        const data = await response.json()
        setWorkSpaces(data)
        
    }
    const fetchChannels = async () => {
        const response = await fetch('http://localhost:5000/workspaces')
        const data = await response.json()
        setChannels(data)
    }
    const fetchMenssages = async () => {
        const response = await fetch('http://localhost:5000/channels')
        const data = await response.json()
        setMesseges(data)
    }


    return (
        <GlobalContext.Provider value={
            {
                workSpaces: workSpaces,
                channels: channels,
                messeges: messeges,
                fetchWorkSpaces: fetchWorkSpaces,
                fetchChannels: fetchChannels,
                fetchMenssages: fetchMenssages
            }


        }>
            {children}
        </GlobalContext.Provider>

    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}