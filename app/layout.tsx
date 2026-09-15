import "./globals.css"
import AuthSessionProvider from "./components/SessionProvider"
import NavBar from "./components/NavBar"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"
import FlashNotification from "./components/FlashNotification"
import { Suspense } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Suspense fallback={null}>
              <Notification />
            </Suspense>
            <FlashNotification />
            <main className="max-w-3xl mx-auto p-6">{children}</main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
