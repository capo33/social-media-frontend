import React from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { getAllPosts } from "../redux/fetures/Posts/postSlice";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const post = posts.find((post) => post._id === id);
  console.log("post", post);

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, id]);

  return (
    <div>
      <h1>Post Details</h1>
      {post && (
        <div className='card-detilas' key={post._id}>
          <div className='card-image'>
            <img
              src={post.image}
              alt={post.title}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <span className='card-title'>{post.title}</span>
            <span className='btn-floating halfway-fab waves-effect waves-light red'>
              <i className='material-icons'>favorite</i>
            </span>
          </div>
          <div className='card-content'>
            <p>{post.description}</p>
          </div>
          <div className='card-action'>
            <span>{post.likes.length} likes</span>
            <span>{post.comments.length} comments</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
