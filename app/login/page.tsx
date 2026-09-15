"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { setMessage } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      setMessage("Logged in")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && (
        <p data-testid="error-message" className="text-red-600 mb-3">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block">
            Username
            <input className="border rounded w-full p-2" type="text" name="username" required />
          </label>
        </div>
        <div>
          <label className="block">
            Password
            <input className="border rounded w-full p-2" type="password" name="password" required />
          </label>
        </div>
        <button
          type="submit"
          data-testid="login-button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
