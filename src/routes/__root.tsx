import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

export function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-primary, #0a0a0f)',
      color: 'var(--color-text-primary, #f0f0f5)',
      fontFamily: 'Space Grotesk, sans-serif',
      gap: '1.5rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <span style={{ fontSize: '5rem', lineHeight: 1 }}>404</span>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>页面不存在</h1>
      <p style={{ opacity: 0.6, margin: 0 }}>你访问的页面已消失或从未存在过。</p>
      <Link
        to="/"
        style={{
          marginTop: '0.5rem',
          padding: '0.6rem 1.5rem',
          background: 'var(--color-primary, #6366f1)',
          color: '#fff',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 500,
          fontSize: '0.95rem',
        }}
      >
        返回首页
      </Link>
    </div>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TopUp Hub - Proxy Top-ups',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: '',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="antialiased font-display">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
