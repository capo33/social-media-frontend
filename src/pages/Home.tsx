import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import {
  commentPost,
  deleteCommentPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../redux/fetures/Posts/postSlice";

const Home = () => {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const [comment, setComment] = React.useState("");

  const token = user?.token;
  console.log("user?._id", user?._id);

  console.log(posts);
  const dispatch = useAppDispatch();

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

  return (
    <div>
      <h1>Home</h1>
      {posts &&
        posts.map((post) => {
          const postID = post?._id;

          return (
            <div className='card home-card' key={post?._id}>
              <h5>
                <Link
                  to={
                    post?.postedBy?._id !== user?._id
                      ? `/profile/${post?.postedBy?._id}`
                      : "/profile"
                  }
                >
                  {post?.postedBy?.name}
                  {post?.postedBy?.name ? post?.postedBy?.name : "no name"}
                </Link>
              </h5>

              <h5
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                {post?.postedBy?.name}
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
                <img src={post?.image} alt={post?.title} />
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
                <h6>{post?.title}</h6>
                <p>{substring(post?.description)}</p>
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
                            handleDeleteComment(postID, record._id as string)
                          }
                        >
                          delete_forever
                        </i>
                      </div>
                    </h6>
                  );
                })}

                <form onSubmit={(e) => handleSubmitComment(e, postID)}>
                  <input
                    type='text'
                    name='comment'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    onClick={() => console.log("clicked")}
                  />

                  <input type='hidden' name='postID' value={postID} />
                  {/* <button
                    className='btn waves-effect waves-light #64b5f6 blue darken-1'
                    type='submit'
                    // onClick={() => {
                    //   handleComment(comment, postID);
                    //   setComment("");
                    // }}
                  >
                    comment
                  </button> */}
                  {/* <button
                  className='btn waves-effect waves-light #64b5f6 blue darken-1'
                  type='submit'
                  onClick={() => {
                    handleComment(comment, postID);
                    // deleteComment(post?._id, post?.comments._id);
                  }}
                >
                  delete comment
                </button> */}
                  {/* delete comment */}
                </form>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
