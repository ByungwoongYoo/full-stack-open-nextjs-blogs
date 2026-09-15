import { cookies } from "next/headers"

export default async function FlashNotification() {
  const jar = await cookies()
  const message = jar.get("notification")?.value
  if (!message) return null

  return (
    <div
      data-testid="notification"
      className="max-w-3xl mx-auto mt-4 px-4 py-2 rounded bg-green-100 text-green-800 border border-green-300"
    >
      {message}
    </div>
  )
}
