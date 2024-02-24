import React, {useState, createContext}from 'react'

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState({});
  const value = {
    bookData, 
    setBookData,
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}
