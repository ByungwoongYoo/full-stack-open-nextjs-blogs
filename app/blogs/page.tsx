import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const dynamic = "force-dynamic"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const searchTerm = filter ?? ""
  const blogs = await getBlogs(searchTerm || undefined)

  return (
    <div>
      <h2>Blogs</h2>
      <form>
        <input type="text" name="filter" defaultValue={searchTerm} placeholder="filter by title" />
        <button type="submit">search</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            {" "}{blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
