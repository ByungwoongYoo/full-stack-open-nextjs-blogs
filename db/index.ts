import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

const url =
  process.env.DATABASE_URL ?? "postgresql://localhost/placeholder"

export const db = drizzle(url, { schema })
