"use client"

import { useActionState } from "react"
import { createBlog, BlogFormState } from "../../actions/blogs"

const initial: BlogFormState = {}

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, initial)

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-3">
        <div>
          <label className="block">
            Title
            <input
              className="border rounded w-full p-2"
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
            />
          </label>
          {state.errors?.title && (
            <p data-testid="title-error" className="text-red-600 text-sm">
              {state.errors.title}
            </p>
          )}
        </div>
        <div>
          <label className="block">
            Author
            <input
              className="border rounded w-full p-2"
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
            />
          </label>
        </div>
        <div>
          <label className="block">
            URL
            <input
              className="border rounded w-full p-2"
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
