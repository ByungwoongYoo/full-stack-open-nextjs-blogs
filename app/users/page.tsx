import Link from "next/link"
import { getUsers } from "../services/users"

export const dynamic = "force-dynamic"

const Users = async () => {
  const users = await getUsers()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id}>
            <Link className="text-blue-700" href={`/users/${user.username}`}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users
