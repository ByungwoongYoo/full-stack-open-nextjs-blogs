import { eq } from "drizzle-orm"
import { getDb } from "../../db"
import { users } from "../../db/schema"

export const getUsers = async () => {
  try {
    const db = getDb()
    return await db.query.users.findMany()
  } catch {
    return []
  }
}

export const getUserWithBlogs = async (username: string) => {
  try {
    const db = getDb()
    return await db.query.users.findFirst({
      where: eq(users.username, username),
      with: { blogs: true },
    })
  } catch {
    return undefined
  }
}
