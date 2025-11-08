import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multi-Agent Code Studio',
  description: 'Professional multi-agent development environment with MCP integration',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
