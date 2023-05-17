import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { myPosts } from "../redux/fetures/Posts/postSlice";
import { userProfile } from "../redux/fetures/Auth/authSlice";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { user: me } = useAppSelector((state) => state.auth);
  console.log("user", user);
  console.log("me", me);

  const token = user?.user?.token;
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      userProfile({
        id: me?._id,
        token: me?.token,
      })
    );
    dispatch(myPosts(token));
  }, [dispatch, me?._id, me?.token, token]);

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>
              {user?.posts?.length}{" "}
              {user?.posts?.length === 1 ? "post" : "posts"}
            </h6>

            <h6>{user?.user?.followers?.length} followers</h6>
            <h6>{user?.user?.following?.length} following</h6>
          </div>
        </div>
      </div>
      <div className='gallery'>
        {user?.posts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No posts yet</h2>
        )}
        {user?.posts &&
          user?.posts.map((item) => {
            return (
              <img
                className='item'
                src={item.image}
                alt={item.title}
                key={item._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
