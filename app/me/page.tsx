import { redirect } from "next/navigation"
import Link from "next/link"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "../services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { generateToken } from "../actions/users"
import { markAsRead } from "../actions/blogs"

export const dynamic = "force-dynamic"

const MePage = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const items = await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true },
  })

  const unread = items.filter((item) => !item.read)
  const read = items.filter((item) => item.read)

  return (
    <div className="space-y-6">
      <section data-testid="user-profile" className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">My page</h2>
        <p data-testid="user-name">Name: {user.name}</p>
        <p data-testid="user-username">Username: {user.username}</p>
        <div className="mt-4">
          <p>API token</p>
          {user.token ? (
            <code className="block bg-slate-100 p-2 rounded break-all">{user.token}</code>
          ) : (
            <p>No token has been generated yet.</p>
          )}
          <form action={generateToken} className="mt-2">
            <button className="bg-slate-800 text-white px-3 py-1 rounded" type="submit">
              Generate token
            </button>
          </form>
        </div>
      </section>

      <section data-testid="reading-list-section" className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-3">Reading list</h3>
        {items.length === 0 && (
          <p data-testid="empty-reading-list">No blogs in the reading list yet.</p>
        )}

        <div data-testid="unread-section" className="mb-4">
          <h4 className="font-medium">Unread</h4>
          {unread.length === 0 ? (
            <p data-testid="no-unread-blogs">No unread blogs</p>
          ) : (
            <ul>
              {unread.map((item) => (
                <li key={item.id} className="flex items-center gap-2 py-1">
                  <Link className="text-blue-700" href={`/blogs/${item.blog.id}`}>
                    {item.blog.title}
                  </Link>
                  <form action={markAsRead}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      data-testid={`mark-read-${item.id}`}
                      className="text-sm bg-green-600 text-white px-2 py-0.5 rounded"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="font-medium">Read</h4>
          <ul>
            {read.map((item) => (
              <li key={item.id}>
                <Link className="text-blue-700" href={`/blogs/${item.blog.id}`}>
                  {item.blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default MePage
