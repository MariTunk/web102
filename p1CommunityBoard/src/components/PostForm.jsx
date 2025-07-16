import { useState } from 'react';


const PostForm = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (title && author && description) {
        onAddBook({ title, author, description, link });
        setTitle('');
        setAuthor('');
        setDescription('');
        setLink('');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          className="w-full border p-2 rounded"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short Description"
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link to learn more (optional)"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Book
        </button>
      </form>
    );
  };
export default PostForm;
