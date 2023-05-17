import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { userProfile } from "../redux/fetures/Users/userSlice";
import { getAllPosts } from "../redux/fetures/Posts/postSlice";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.user);
  const { posts } = useAppSelector((state) => state.posts);

  const dispatch = useAppDispatch();
  console.log("user?.name", user?.user?.name);
  console.log("posts", posts);
  const token = user?.user?.token;
  // console.log(token);

  console.log(id);
  useEffect(() => {
    // fetch user data
    dispatch(getAllPosts());
    dispatch(userProfile({ id, token }));
  }, [dispatch, id, token]);
  return (
    <div
      style={{
        maxWidth: "550px",
        margin: "0px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            // unspalash
            src='https://images.unsplash.com/photo-1666358777417-fa9e86eb5ba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
            alt=''
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
          />
        </div>
        <div>
          <h4>{user?.user?.name}</h4>
          <h5>{user?.user?.email}</h5>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>
              {user?.posts?.length}
              {user?.posts?.length! > 1 ? " posts" : " post"}
            </h6>
            <h6>{user?.user?.followers?.length} followers</h6>
            <h6>{user?.user?.following?.length} following</h6>
          </div>
          {/* {showFollow ? (
          <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            onClick={() => followUser()}
          >
            Follow
          </button>
        ) : (
          <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            onClick={() => unfollowUser()}
          >
            Unfollow
          </button>
        )} */}
        </div>
      </div>
      <div className='gallery'>
        {user?.posts?.map((item) => {
          return (
            <img
              key={item._id}
              className='item'
              src={item.image}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
