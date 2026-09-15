"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex flex-wrap gap-3 items-center">
      <Link href="/" className="hover:underline">home</Link>
      <Link href="/blogs" className="hover:underline">blogs</Link>
      <Link href="/users" className="hover:underline">users</Link>
      {session ? (
        <>
          <Link href="/blogs/new" className="hover:underline">create new</Link>
          <Link href="/me" className="hover:underline">me</Link>
          <em className="text-gray-300">{session.user?.name} logged in</em>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="hover:underline">login</Link>
          <Link href="/register" className="hover:underline">register</Link>
        </>
      )}
    </nav>
  )
}
