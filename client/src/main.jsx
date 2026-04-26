import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/q/:slug" element={<div>Customer Queue Page</div>} />
      <Route path="/login" element={<div>Login</div>} />
    </Routes>
  </BrowserRouter>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
