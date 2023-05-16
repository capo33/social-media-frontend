import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { getAllPosts } from "../redux/fetures/Posts/postSlice";

const Home = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  console.log(posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      {posts && posts.map((post) => 
         {
          console.log(post?.postedBy?._id);
          return (
            <div className='card home-card' key={post._id}>
              {/* <div className='card-content' > */}
              <h5>
                <Link
                  to={
                    post?.postedBy?._id !== user?._id
                      ? `/profile/${post?.postedBy?._id}`
                      : `/profile`
                  }
                >
                  {post.postedBy?.name}
                  {post.postedBy?.name ? post.postedBy?.name : "no name"}
                </Link>
                {post.postedBy?._id === user?._id && (
                  <i
                    className='material-icons'
                    style={{ float: "right", cursor: "pointer" }}
                    // onClick={() => deletePost(post._id)}
                  >
                    delete
                  </i>
                )}
              </h5>
              <h5
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                {post.postedBy?.name}
                {post.postedBy?._id === user?._id && ( 
                  <i
                  className='material-icons'
                  style={{
                    cursor: "pointer",
                  }}
                  // onClick={() => deletePost(post._id)}
                >
                  delete_forever
                </i>
                )}
               
              </h5>
              <div className='card-image'>
                <img src={post.image} alt={post.title} />
              </div>
              <div className='card-content'>
                {/* <i className='material-icons' style={{ color: "red" }}>
                  favorite
                </i> */}
                {/* Check if the post is liked by the current user or not then show the unlike button */}
  
                {post?.likes?.includes(String(user?._id)) ? (
                  <i
                    className='material-icons'
                    style={{ cursor: "pointer" }}
                    // onClick={() => unlike_Post(post._id)}
                  >
                    favorite
                  </i>
                ) : (
                  <i
                    className='material-icons'
                    style={{ cursor: "pointer" }}
                    // onClick={() => like_Post(post._id)}
                  >
                    favorite_border
                  </i>
                )}
                <h6>
                  {post.likes.length} {post.likes.length > 1 ? "likes" : "like"}
                </h6>
                <h6>{post.title}</h6>
                <p>{post.description}</p>
                {/* {post.comments.postedBy} */}
                {post.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span
                        style={{
                          fontWeight: "500",
                          color: "blue",
                          fontSize: "1.1rem",
                          fontFamily: "cursive",
                          marginRight: "0.5rem",
                        }}
                      >
                        {record.postedBy?.name}
                      </span>{" "}
                      {record.comment}
                    </h6>
                  );
                })}
                <form 
                // onSubmit={(e) => handleSubmit(e, post._id)}
                >
                  <input type='text' placeholder='add a comment' />
                </form>
                <button
                  className='btn waves-effect waves-light #64b5f6 blue darken-1'
                  onClick={() => {
                    // deleteComment(post._id, post.comments._id);
                  }}
                >delete comment</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

export default Home;
