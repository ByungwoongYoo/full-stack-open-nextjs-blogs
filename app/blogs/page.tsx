import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const dynamic = "force-dynamic"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; created?: string }>
}) => {
  const { filter } = await searchParams
  const searchTerm = filter ?? ""
  const blogs = await getBlogs(searchTerm || undefined)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <form className="flex gap-2 mb-4">
        <input
          className="border rounded p-2 flex-1"
          type="text"
          name="filter"
          defaultValue={searchTerm}
          data-testid="filter-input"
        />
        <button
          type="submit"
          data-testid="search-button"
          className="bg-slate-800 text-white px-3 rounded"
        >
          search
        </button>
      </form>
      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="bg-white p-3 rounded shadow-sm">
            <Link className="text-blue-700 font-medium" href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
            {" "}{blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
