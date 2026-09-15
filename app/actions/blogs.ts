"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { addBlog, likeBlog } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { db } from "@/db"
import { readingList } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
    form?: string
  }
  values?: {
    title?: string
    author?: string
    url?: string
  }
}

export const createBlog = async (
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string)?.trim() ?? ""
  const author = (formData.get("author") as string)?.trim() ?? ""
  const url = (formData.get("url") as string)?.trim() ?? ""

  const errors: BlogFormState["errors"] = {}
  if (title.length < 5) {
    errors.title = "Title must be at least 5 characters"
  }
  if (!author) {
    errors.author = "Author is required"
  }
  if (!url) {
    errors.url = "URL is required"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url } }
  }

  await addBlog(title, author, url)
  revalidatePath("/blogs")
  revalidatePath("/users")
  revalidatePath("/me")
  redirect("/blogs?created=1")
}

export const incrementLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  await likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const addToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  const blogId = Number(formData.get("blogId"))
  const existing = await db.query.readingList.findFirst({
    where: and(eq(readingList.userId, user.id), eq(readingList.blogId, blogId)),
  })
  if (!existing) {
    await db.insert(readingList).values({
      userId: user.id,
      blogId,
      read: false,
    })
  }
  revalidatePath("/me")
  revalidatePath(`/blogs/${blogId}`)
}

export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  const id = Number(formData.get("id"))
  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, user.id)))
  revalidatePath("/me")
}
