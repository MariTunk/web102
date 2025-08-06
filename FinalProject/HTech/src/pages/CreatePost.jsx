import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import { TAGS } from '../data/tags';
import '../App.css';

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    Title: '',
    Content: '',
    image_url: '',
    Author: '',
    Tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const safeTags = Array.isArray(post.Tags) ? post.Tags : [];

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        ...post,
        Tags: safeTags,
        upvotes: 0,
        created_at: new Date().toISOString()
      }])
      .select();

    setLoading(false);

    if (error) {
      console.error('Error creating post:', error);
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    if (data && data.length > 0) {
      setSuccessMsg(' Your story has been shared successfully!');
      setPost({
        Title: '',
        Content: '',
        image_url: '',
        Author: '',
        Tags: [],
      });
      // Optional: redirect to post detail page
      // navigate(`/post/${data[0].id}`);
    } else {
      console.error('No data returned from insert.');
      setErrorMsg('Post created, but no ID returned.');
    }
  };

  const toggleTag = (tagName) => {
    setPost(prev => ({
      ...prev,
      Tags: prev.Tags.includes(tagName)
        ? prev.Tags.filter(t => t !== tagName)
        : [...prev.Tags, tagName]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-card" aria-label="Create a new post">
      <h2>Create a New Story</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}
      <input
        type="text"
        placeholder="Title"
        aria-label="Post title"
        value={post.Title}
        onChange={(e) => setPost({ ...post, Title: e.target.value })}
        required
      />

      <textarea
        placeholder="Your story"
        aria-label="Post content"
        value={post.Content}
        onChange={(e) => setPost({ ...post, Content: e.target.value })}
      />

      <input
        type="text"
        placeholder="Image URL"
        aria-label="Image URL"
        value={post.image_url}
        onChange={(e) => setPost({ ...post, image_url: e.target.value })}
      />

      <input
        type="text"
        placeholder="Your name"
        aria-label="Author name"
        value={post.Author}
        onChange={(e) => setPost({ ...post, Author: e.target.value })}
      />

      {/* Tag Selector */}
      <div className="tag-selector">
        <p>Select Tags:</p>
        <div className="tag-options">
          {TAGS.map(tag => (
            <button
              key={tag.name}
              type="button"
              className={`tag-button ${post.Tags.includes(tag.name) ? 'selected' : ''}`}
              onClick={() => toggleTag(tag.name)}
              aria-pressed={post.Tags.includes(tag.name)}
              aria-label={`Tag: ${tag.name}`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Optional: Preview selected tags */}
      {post.Tags.length > 0 && (
        <div className="tag-preview">
          <p>Selected Tags:</p>
          <ul>
            {post.Tags.map(tag => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      )}

     

      <div className="buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Sharing...' : 'Share Story'}
        </button>
        
        <Link to="/" className="home-link">← Back to Home</Link>
      </div>
    </form>
  );
}

export default CreatePost;
