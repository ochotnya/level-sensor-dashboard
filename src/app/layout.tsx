import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationMenu from '~/app/_components/NavigationMenu'
import TitleBar from '~/app/_components/TitleBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monitoring poziomu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <TitleBar />
        <div className="flex">
          <NavigationMenu />
          <div className="w-full px-4">{children}</div>
        </div>
      </body>
    </html>
  )
}
