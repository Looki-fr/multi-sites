import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Louis from './pages/Louis'
import Page404 from './pages/Page404'
import "flag-icons/css/flag-icons.min.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/multi-sites">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/louis" element={<Louis />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
