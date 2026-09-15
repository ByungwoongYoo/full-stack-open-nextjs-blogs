import { desc, eq, ilike } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingList } from "@/db/schema"
import { getCurrentUser } from "./session"

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: ilike(blogs.title, `%${filter}%`),
      orderBy: [desc(blogs.likes)],
    })
  }
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.likes)],
  })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Not logged in")
  }

  const inserted = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes: 0,
      userId: user.id,
    })
    .returning({ id: blogs.id })

  const blogId = inserted[0]?.id
  if (blogId) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }
}

export const likeBlog = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id))
  }
}
