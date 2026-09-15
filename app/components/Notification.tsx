"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, setMessage } = useNotification()
  const params = useSearchParams()

  useEffect(() => {
    if (params.get("created") === "1") {
      setMessage("Blog created")
    }
    if (params.get("login") === "1") {
      setMessage("Logged in")
    }
  }, [params, setMessage])

  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => setMessage(""), 4000)
    return () => clearTimeout(t)
  }, [message, setMessage])

  if (!message) return null

  return (
    <div
      data-testid="notification"
      className="max-w-3xl mx-auto mt-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-300"
    >
      {message}
    </div>
  )
}
