"use client"

import { createContext, useContext, useState } from "react"

type NotificationContextType = {
  message: string
  setMessage: (msg: string) => void
}

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  setMessage: () => {},
})

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [message, setMessage] = useState("")
  return (
    <NotificationContext.Provider value={{ message, setMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
