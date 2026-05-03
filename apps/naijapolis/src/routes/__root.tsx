import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import '../styles.css'
import { AppLayout } from '../components/AppLayout'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'NaijaPolis Campaign Platform for Nigeria' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
