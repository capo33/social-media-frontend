import React from "react";
import { Link, useParams } from "react-router-dom";

import { getAllPosts } from "../redux/fetures/Posts/postSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/store";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { posts } = useAppSelector((state) => state.posts);
  const post = posts.find((post) => post._id === id);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, id]);

  return (
    <div>
      {post && (
        <div className='card' key={post._id} style={{ maxWidth: "50%" }}>
          {/* Narrow link back */}
          <div className='card-action'>
            <Link to='/' className='btn'>
              Back
            </Link>
          </div>
          <div className='card-image'>
            <img
              src={post.image}
              alt={post.title}
              style={{
                maxWidth: "90%",
                maxHeight: "50%",
                margin: "0 auto",
              }}
            />
            <p>Posted by {post?.postedBy?.name}</p>
            <p>
              Title: <span>{post?.title ? post?.title : "no title"}</span>
            </p>
          </div>
          <div className=' '>
            <p>
              Description:{" "}
              <span>
                {post?.description ? post?.description : "no description"}
              </span>
            </p>
          </div>
          <div className=''>
            <p>likes: {post.likes.length}</p>

            <p>
              Comments:{" "}
              {post.comments.length ? post.comments.length : "no comments"}
            </p>

            {/* All comments */}
            {post.comments.map((comment) => (
              <div key={comment._id}>
                <h6>
                  <span>by@{comment?.postedBy?.name}</span>
                </h6>
                <p>{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
