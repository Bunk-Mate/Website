'use client'

import { createContext, useEffect, useState } from "react"

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userID, setUserID] = useState();
    useEffect(()=>{
        console.log("Setting user context ", userID);
    },[userID])

    return <UserContext.Provider value={{userID, setUserID}}>{children}</UserContext.Provider>
}