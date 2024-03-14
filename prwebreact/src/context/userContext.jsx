import React, {useState, createContext}from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const value = {
    userData, 
    setUserData,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
