import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementLikes, addToReadingList } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"

export const dynamic = "force-dynamic"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog) {
    notFound()
  }

  const showReadingListButton = user && user.id !== blog.userId

  return (
    <div data-testid="blog-detail" className="bg-white p-6 rounded shadow">
      <h2 data-testid="blog-title" className="text-2xl font-bold">
        {blog.title}
      </h2>
      <p data-testid="blog-author">author: {blog.author}</p>
      <p>
        url:{" "}
        <a className="text-blue-600 underline" href={blog.url}>
          {blog.url}
        </a>
      </p>
      <p>likes: {blog.likes}</p>
      <form action={incrementLikes} className="mt-3">
        <input type="hidden" name="id" value={blog.id} />
        <button className="bg-slate-800 text-white px-3 py-1 rounded" type="submit">
          like
        </button>
      </form>
      {showReadingListButton && (
        <form action={addToReadingList} className="mt-3">
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            type="submit"
            data-testid="add-to-reading-list-button"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            add to reading list
          </button>
        </form>
      )}
    </div>
  )
}

export default BlogPage
