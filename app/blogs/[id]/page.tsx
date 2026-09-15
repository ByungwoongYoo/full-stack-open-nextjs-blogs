import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementLikes } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>
        url: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </p>
      <p>likes: {blog.likes}</p>
      <form action={incrementLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  )
}

export default BlogPage
