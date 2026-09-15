"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { getCurrentUser } from "@/app/services/session"
import { eq } from "drizzle-orm"

export type RegisterState = {
  errors?: {
    username?: string
    name?: string
    password?: string
    passwordConfirm?: string
  }
  values?: {
    username?: string
    name?: string
  }
}

export const registerUser = async (
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get("username") as string)?.trim() ?? ""
  const name = (formData.get("name") as string)?.trim() ?? ""
  const password = (formData.get("password") as string) ?? ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) ?? ""

  const errors: RegisterState["errors"] = {}
  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters"
  }
  if (!name) {
    errors.name = "Name is required"
  }
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })
  redirect("/login")
}

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  const token = crypto.randomUUID()
  await db.update(users).set({ token }).where(eq(users.id, user.id))
  revalidatePath("/me")
}
