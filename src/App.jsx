import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/userPages/Dashboard.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import Katalog from './pages/userPages/Katalog.jsx'
import BookDetail from './pages/userPages/BookDetail.jsx'
import Keranjang from './pages/userPages/Keranjang.jsx'
import Pembayaran from './pages/userPages/Pembayaran.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/katalog" element={<Katalog />} />
        <Route path="/cart" element={<Keranjang />} />
        <Route path="/pembayaran/:method" element={<Pembayaran />} />
      </Route>
    </Routes>
  )
}

export default App
