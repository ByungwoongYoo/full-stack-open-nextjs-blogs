"use client"

import { useActionState } from "react"
import { registerUser, RegisterState } from "../actions/users"

const initial: RegisterState = {}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, initial)

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-3">
        <div>
          <label className="block">
            Username
            <input
              className="border rounded w-full p-2"
              type="text"
              name="username"
              defaultValue={state.values?.username}
              required
            />
          </label>
          {state.errors?.username && (
            <p data-testid="username-error" className="text-red-600 text-sm">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label className="block">
            Name
            <input
              className="border rounded w-full p-2"
              type="text"
              name="name"
              defaultValue={state.values?.name}
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            Password
            <input className="border rounded w-full p-2" type="password" name="password" required />
          </label>
        </div>
        <div>
          <label className="block">
            Confirm Password
            <input className="border rounded w-full p-2" type="password" name="passwordConfirm" required />
          </label>
          {state.errors?.passwordConfirm && (
            <p data-testid="passwordConfirm-error" className="text-red-600 text-sm">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          data-testid="register-button"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  )
}
