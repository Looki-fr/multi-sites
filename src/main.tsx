import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Louis from './pages/Louis'
import Page404 from './pages/Page404'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/multi-sites" element={<App />} />
        <Route path="/multi-sites/louis" element={<Louis />} />

        {/* Catch-all: toute URL non gérée => 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
