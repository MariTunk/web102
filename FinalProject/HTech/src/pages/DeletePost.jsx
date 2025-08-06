import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../client';
import '../App.css';

function DeletePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostTitle = async () => {
      const numericId = Number(id);
      if (!id || isNaN(numericId)) {
        setErrorMsg('Invalid post ID.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .select('Title')
        .eq('id', numericId)
        .single();

      if (error) {
        console.error('Error fetching post title:', error);
        setErrorMsg('Failed to load post. It may not exist.');
      } else {
        setPostTitle(data.Title);
      }

      setLoading(false);
    };

    fetchPostTitle();
  }, [id]);

  const handleDelete = async () => {
    setErrorMsg('');
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', Number(id));

    if (error) {
      console.error('Error deleting post:', error);
      setErrorMsg('Failed to delete post. Please try again.');
    } else {
      navigate('/');
    }
  };

  if (loading) return <p className="loading">Loading post...</p>;
  if (errorMsg) return <p className="error">{errorMsg}</p>;

  return (
    <div className="form-card">
      <h2>Delete Post</h2>
      <p>Are you sure you want to delete <strong>{postTitle}</strong>?</p>

      <div className="buttons">
        <button onClick={handleDelete} className="danger">
          Yes, Delete
        </button>
        <br />
        <Link to={`/post/${id}`} className="home-link">← Cancel</Link>
      </div>
    </div>
  );
}

export default DeletePost;
