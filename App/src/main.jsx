import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ImagePage from './components/pages/ImagePage.jsx'
import FavoritesPage from './components/pages/FavoritesPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/image/:id" element={<ImagePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
)

