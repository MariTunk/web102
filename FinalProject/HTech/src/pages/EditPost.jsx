import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import '../App.css';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    Title: '',
    Content: '',
    image_url: '',
    Author: '',
    Tags: [],
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      console.log('EditPost route param:', id);

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', Number(id))
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setErrorMsg('Failed to load post. Please check the URL or try again.');
      } else {
        setPost({
          Title: data.Title || '',
          Content: data.Content || '',
          image_url: data.image_url || '',
          Author: data.Author || '',
          Tags: data.Tags || [],
        });
      }

      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase
      .from('posts')
      .update({
        ...post,
        updated_at: new Date().toISOString()
      })
      .eq('id', Number(id));

    if (error) {
      console.error('Error updating post:', error);
      setErrorMsg('Update failed. Please try again.');
    } else {
      navigate(`/post/${id}`);
    }
  };

  if (loading) return <p className="loading">Loading post...</p>;

  return (
    <div className="edit-wrapper">
      <form onSubmit={handleUpdate} className="form-card" aria-label="Edit post form">
        <h2>Edit Your Story</h2>

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

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          aria-label="Tags"
          value={post.Tags.join(', ')}
          onChange={(e) =>
            setPost({ ...post, Tags: e.target.value.split(',').map(tag => tag.trim()) })
          }
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <div className="buttons">
          <button type="submit">Update Story</button>
          <br />
          <Link to="/" className="home-link">← Back to Home</Link>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
