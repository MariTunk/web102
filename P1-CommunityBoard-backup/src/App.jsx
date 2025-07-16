import { useState } from 'react'
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css'

const App = () => {
  const [books, setBooks] = useState([]);

  const addBook = (book) => {
    setBooks([{ id: Date.now(), ...book }, ...books]);
  };
 
  return (
    <div className="App p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Mariyam's Book Board</h1>
      <h2 className="text-gray-600 mb-4">Share and discover your favorite books!</h2>
      <PostList books={books} />
      <h2 className="text-gray-600 mb-4"> Add your favorite books!</h2>
      <PostForm onAddBook={addBook} />
    </div>
  );
};

export default App
