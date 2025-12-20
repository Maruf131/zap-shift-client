import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';
import Aos from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



Aos.init({
  duration: 1000,
  offset: 120,
  easing: "ease-in-out",
  once: false
})

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='urbanist-font max-w-7xl mx-auto'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)