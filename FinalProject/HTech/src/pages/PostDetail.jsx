import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { useParams, Link } from 'react-router-dom';
import Comments from '../components/Comments';
import '../App.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    const numericId = Number(id);
    if (!id || isNaN(numericId)) {
      console.error('Invalid ID:', id);
      setErrorMsg('Invalid post ID. Please check the URL.');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', numericId)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
      setErrorMsg('Failed to load post. Please try again.');
    } else {
      setPost(data);
      setUpvoteCount(data.upvotes || 0);
      checkLocalUpvote(data.id);
    }
  };

  const checkLocalUpvote = (postId) => {
    const votedPosts = JSON.parse(localStorage.getItem('upvotedPosts') || '[]');
    setHasUpvoted(votedPosts.includes(postId));
  };

  const handleUpvoteToggle = async () => {
    if (!post) return;

    const votedPosts = JSON.parse(localStorage.getItem('upvotedPosts') || '[]');
    const alreadyVoted = votedPosts.includes(post.id);
    const newCount = alreadyVoted ? Math.max(0, upvoteCount - 1) : upvoteCount + 1;

    const { error } = await supabase
      .from('posts')
      .update({ upvotes: newCount })
      .eq('id', post.id);

    if (!error) {
      setUpvoteCount(newCount);
      setHasUpvoted(!alreadyVoted);

      const updatedVotes = alreadyVoted
        ? votedPosts.filter((pid) => pid !== post.id)
        : [...votedPosts, post.id];

      localStorage.setItem('upvotedPosts', JSON.stringify(updatedVotes));
    } else {
      console.error('Upvote toggle error:', error);
    }
  };

  if (errorMsg) return <p className="error">{errorMsg}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="post-detail">
        <h2>{post.Title}</h2>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={`Image for ${post.Title}`}
            className="post-image"
          />
        )}

        <p className="post-content">{post.Content}</p>

        <p><strong>Author:</strong> {post.Author}</p>
        <p><strong>Tags:</strong> {post.Tags?.join(', ') || 'None'}</p>

        {/* Upvote & Actions */}
        <div className="post-actions">
          <button
            onClick={handleUpvoteToggle}
            className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}
          >
            Upvote ({upvoteCount})
          </button>

          <div className="action-links">
            <Link to={`/post/${id}/edit`} className="edit-link">Edit Post</Link>
            <Link to={`/post/${id}/delete`} className="delete-link">Delete Post</Link>
            <Link to="/" className="home-link">Back to Home</Link>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <section className="comments-wrapper">
        <hr />
        <Comments postId={post.id} />
      </section>
    </>
  );
}

export default PostDetail;
