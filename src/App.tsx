import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import Index from './pages/Index'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Index /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="bottom-center" visibleToasts={1} duration={2000} />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App