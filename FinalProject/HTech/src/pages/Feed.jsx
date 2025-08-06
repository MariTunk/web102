import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';
import { TAGS } from '../data/tags';
import '../App.css';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = selectedTag
    ? posts.filter(post =>
        Array.isArray(post.Tags) && post.Tags.includes(selectedTag)
      )
    : posts;

  return (
    <div className="feed-container">
      <div className="feed-header">
        <Link to="/create" className="create-post-button">
          Create a Post
        </Link>

        <h1 className="feed-title">Hijabis In Tech</h1>
        <p className="feed-description">
          Welcome to the Hijabis In Tech community! Here you can share your stories,
          experiences, and insights.
        </p>

        {/*  Tag Search Dropdown */}
        <div className="tag-search">
          <label htmlFor="tag-filter" className="tag-label">
            Filter by Tag:
          </label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="tag-dropdown"
          >
            <option value="">All Tags</option>
            {TAGS.map(tag => (
              <option key={tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>

          {selectedTag && (
            <button
              className="clear-filter-button"
              onClick={() => setSelectedTag('')}
            >
              ✖ Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="feed">
        {loading ? (
          <p className="loading">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="no-posts">No posts available.</p>
        ) : (
          filteredPosts
            .filter(post => post?.id)
            .map(post => (
              <div key={post.id} className="post-card">
                <Link to={`/post/${post.id}`} className="post-link">
                  <h2 className="post-title">{post.Title}</h2>
                </Link>
                <p className="post-created_at">Created on: {post.created_at}</p>
                <p className="post-upvotes">Upvotes: {post.upvotes}</p>

                <Link
                  to={`/post/${post.id}`}
                  className="view-link"
                  aria-label={`View full post titled ${post.Title}`}
                >
                  View Full Post
                </Link>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Feed;
