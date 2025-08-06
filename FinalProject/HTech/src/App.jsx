import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed.jsx';
import CreatePost from './pages/CreatePost.jsx';
import PostDetail from './pages/PostDetail.jsx';
import EditPost from './pages/EditPost.jsx';
import DeletePost from './pages/DeletePost.jsx';
import './App.css'

function App() {
  

  return (
    <>
    <Router>
    
      <div className="app">
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
        <Route path="/post/:id/delete" element={<DeletePost/>} />
        <Route path="*" element={<p>404: Page not found</p>} />
      </Routes>
      </div>
    </Router>
    </>
  )
}

export default App