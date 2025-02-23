import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Registers from './pages/Register'
import Treasury from './pages/Treasury'
import { Books } from './pages/Books'
import About from './pages/About'
import Register from './pages/Register'
import Content from './pages/Content'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registers" element={<Registers />} />
        <Route path="/book" element={<Books />} />
        <Route path="/readings" element={<Treasury />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/content/:book_id" element={<Content />} /> {/* แก้ไขตรงนี้ */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
