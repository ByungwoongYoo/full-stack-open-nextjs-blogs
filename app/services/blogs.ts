export type Blog = {
  id: number
  title: string
  author: string
  url: string
  likes: number
}

const blogs: Blog[] = [
  { id: 1, title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { id: 2, title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 },
  { id: 3, title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 },
  { id: 4, title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", likes: 10 },
  { id: 5, title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0 },
  { id: 6, title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2 }
]

let nextId = 7

export const getBlogs = () => blogs
export const getBlogById = (id: number) => blogs.find((blog) => blog.id === id)
export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}
export const likeBlog = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) blog.likes += 1
}
