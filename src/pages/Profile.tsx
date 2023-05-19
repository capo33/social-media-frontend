import React, { useEffect, useState } from "react";

import { myPosts } from "../redux/fetures/Posts/postSlice";
import { userProfile } from "../redux/fetures/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/store";
import axios from "axios";
import { updateProfilePic } from "../redux/fetures/Users/userSlice";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);
  const { user: me } = useAppSelector((state) => state.auth);
  const [image, setImage] = useState<string>("");
  const [url, setUrl] = useState("");
  const token = user?.user?.token;
  const dispatch = useAppDispatch();

  const fromStorage = JSON.parse(localStorage.getItem("pic") || "{}");
  const avatar = fromStorage?.user?.avatar;

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaclon");
    data.append("cloud_name", "dkaxbb8gz");
    // Make a request to cloudinary
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkaxbb8gz/image/upload",
      data
    );
    setUrl(res.data.url);
  };

  useEffect(() => {
    if (url) {
      dispatch(updateProfilePic({ avatar: url, token: me?.token }));
    }
  }, [url, dispatch, me?._id, me?.token]);

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
            src={user?.user?.avatar || me?.avatar || fromStorage?.user?.avatar}
            alt=''
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
          />
          <form onSubmit={handleSubmit}>
            <div className='file-field input-field'>
              <div className='btn '>
                <span>Upload Image</span>

                <input
                  type='file'
                  onChange={(e) => setImage(e.target.files![0] as any)}
                />
              </div>
              <div className='file-path-wrapper'>
                <input className='file-path validate' type='text' />
              </div>
            </div>
            <button
              type='submit'
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
            >
              Submit Post
            </button>
          </form>
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
