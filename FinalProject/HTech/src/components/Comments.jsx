import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import ReactMarkdown from 'react-markdown';
import '../App.css'; // Make sure this includes the comment section styles

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error) setComments(data);
    else console.error('Fetch error:', error);
  };

  const handleSubmit = async () => {
    setErrorMsg('');

    if (!newComment.trim() || !authorName.trim()) {
      setErrorMsg('Please enter your name and comment.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: postId,
          body: newComment,
          author_name: authorName,
        },
      ])
      .select();

    if (error) {
      console.error('Insert error:', error);
      setErrorMsg('Something went wrong. Please try again.');
      return;
    }

    if (data && data.length > 0) {
      setNewComment('');
      setAuthorName('');
      fetchComments();
    } else {
      console.error('No data returned from insert.');
      setErrorMsg('Comment posted, but no ID returned.');
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (!error) fetchComments();
    else console.error('Delete error:', error);
  };

  const handleEdit = async (id) => {
    if (!editContent.trim()) return;

    const { error } = await supabase
      .from('comments')
      .update({ body: editContent })
      .eq('id', id);

    if (!error) {
      setEditingId(null);
      setEditContent('');
      fetchComments();
    } else {
      console.error('Edit error:', error);
    }
  };

  const CommentItem = ({ comment }) => {
    const isOwner = comment.author_name === authorName;
    const isEditing = editingId === comment.id;

    return (
      <div className="comment-item">
        <p className="comment-meta">
          <strong>{comment.author_name}</strong>{' '}
          <em>{new Date(comment.created_at).toLocaleString()}</em>
        </p>

        {isEditing ? (
          <div className="comment-edit">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="comment-actions">
              <button onClick={() => handleEdit(comment.id)}>💾 Save</button>
              <button onClick={() => setEditingId(null)}>❌ Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <div className="comment-body">
              <ReactMarkdown>{comment.body}</ReactMarkdown>
            </div>
            {isOwner && (
              <div className="comment-actions">
                <button
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditContent(comment.body);
                  }}
                >
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(comment.id)}>🗑️ Delete</button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <div className="comment-form">
        <input
          type="text"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleSubmit}>🚀 Post</button>
        {errorMsg && <p className="comment-error">{errorMsg}</p>}
      </div>
    </div>
  );
}
