import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  commentPost,
  deleteCommentPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../redux/fetures/Posts/postSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

const Home = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [comment, setComment] = React.useState("");
  const [show, setShow] = React.useState(false);

  const dispatch = useAppDispatch();
  const token = user?.token;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const substring = (str: string) => {
    return str?.length > 10 ? str.substring(0, 30) + "..." : str;
  };

  const handleLike = async (id: string) => {
    dispatch(likePost({ postID: id, token }));
  };

  const handleUnlike = async (id: string) => {
    dispatch(unlikePost({ postID: id, token }));
  };

  const handleComment = (comment: string, id: string) => {
    dispatch(commentPost({ comment, postID: id, token }));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    dispatch(deleteCommentPost({ postId, commentId, token }));
  };

  const handleSubmitComment = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    handleComment(comment, id);
    setComment("");
    e.currentTarget.value = "";
  };

  //  Show and hide comments
  const toggleComment = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const commentStyle = {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
  };

  return (
    <div style={{ marginTop: "5em" }}>
      <div className='row'>
        {posts?.length === 0 && <h2 className='center-align'>No posts yet</h2>}
        {posts &&
          posts.map((post) => {
            const postID = post?._id;

            return (
              <div className='col m12' key={post?._id}>
                <div className='card home-card' key={post?._id}>
                  <h6>
                    <Link
                      to={
                        post?.postedBy?._id !== user?._id
                          ? `/profile/${post?.postedBy?._id}`
                          : "/profile"
                      }
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underLine",
                        }}
                      >
                        by@
                      </span>{" "}
                      {post?.postedBy?.name ? post?.postedBy?.name : "no name"}
                    </Link>
                  </h6>

                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 16px",
                    }}
                  >
                    {post?.title}
                    {post?.postedBy?._id === user?._id && (
                      <i
                        className='material-icons'
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(deletePost({ postID, token, toast }))
                        }
                      >
                        delete_forever
                      </i>
                    )}
                  </h5>

                  <div className='card-image'>
                    <Link to={`/post-details/${post?._id}`}>
                      <img
                        src={post?.image}
                        alt={post?.title}
                        style={{ height: "300px" }}
                      />
                    </Link>
                  </div>
                  <div className='card-content'>
                    {/* Check if the post is liked by the current user or not then show the unlike button */}
                    {post?.likes?.includes(user?._id!) ? (
                      <i
                        className='material-icons'
                        style={{ cursor: "pointer" }}
                        onClick={() => handleUnlike(post._id)}
                      >
                        favorite
                      </i>
                    ) : (
                      <i
                        className='material-icons'
                        style={{ cursor: "pointer" }}
                        onClick={() => handleLike(post._id)}
                      >
                        favorite_border
                      </i>
                    )}

                    <h6>
                      {post?.likes?.length}{" "}
                      {post?.likes?.length > 1 ? "likes" : "like"}
                    </h6>
                    <p>{substring(post?.description)}</p>

                    {/* Toggle comment section depending on the number of comments */}
                    {post?.comments.length > 2 && (
                      <>
                        {show ? (
                          <h6
                            style={commentStyle}
                            onClick={() => toggleComment()}
                          >
                            <span>Hide Comments</span>
                            <i className='material-icons'>keyboard_arrow_up</i>
                          </h6>
                        ) : (
                          <h6
                            style={commentStyle}
                            onClick={() => toggleComment()}
                          >
                            <span>
                              {post?.comments?.length > 0
                                ? "Show Comments"
                                : "No Comments Yet"}
                            </span>
                            <i className='material-icons'>
                              keyboard_arrow_down
                            </i>
                          </h6>
                        )}
                      </>
                    )}

                    {/* Show first two comments */}
                    {post?.comments.length > 0 && !show && (
                      <>
                        {post?.comments.slice(0, 2).map((record) => {
                          return (
                            <h6 key={record._id}>
                              <div
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <p>
                                    <span
                                      style={{
                                        marginRight: "1rem ",
                                      }}
                                    >
                                      {record?.postedBy?.name}
                                    </span>
                                    <span>{substring(record.comment)}</span>
                                  </p>
                                </div>
                                {record?.postedBy?._id === user?._id && (
                                  <i
                                    className='material-icons'
                                    onClick={() =>
                                      handleDeleteComment(
                                        postID,
                                        record._id as string
                                      )
                                    }
                                  >
                                    delete_forever
                                  </i>
                                )}
                              </div>
                            </h6>
                          );
                        })}
                      </>
                    )}

                    {/* Show all comments */}
                    {show && (
                      <>
                        {post?.comments.map((record) => {
                          return (
                            <h6 key={record._id}>
                              <div
                                style={{
                                  cursor: "pointer",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <p>
                                    <span
                                      style={{
                                        marginRight: "1rem ",
                                      }}
                                    >
                                      {record?.postedBy?.name}
                                    </span>
                                    <span>{substring(record.comment)}</span>
                                  </p>
                                </div>
                                <i
                                  className='material-icons'
                                  onClick={() =>
                                    handleDeleteComment(
                                      postID,
                                      record._id as string
                                    )
                                  }
                                >
                                  delete_forever
                                </i>
                              </div>
                            </h6>
                          );
                        })}
                      </>
                    )}

                    <form onSubmit={(e) => handleSubmitComment(e, postID)}>
                      <input
                        type='text'
                        name='comment'
                        placeholder='Add a comment'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                      />
                      <input type='hidden' name='postID' value={postID} />
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
