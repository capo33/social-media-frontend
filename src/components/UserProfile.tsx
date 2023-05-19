import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  follow,
  unfollow,
  userProfile,
} from "../redux/fetures/Users/userSlice";
import { getAllPosts } from "../redux/fetures/Posts/postSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/store";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.user);
  const { user: me } = useAppSelector((state) => state.auth);

  const followerMap = user?.user?.followers?.map(
    (follower: any) => follower?._id
  );

  const dispatch = useAppDispatch();
  const token = me?.token;
 
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
          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            onClick={() => {
              followerMap?.includes(me?._id as string)
                ? dispatch(
                    unfollow({
                      unfollowId: id,
                      userId: me?._id,
                      token: me?.token,
                    })
                  )
                : dispatch(
                    follow({
                      followId: id,
                      userId: me?._id,
                      token: me?.token,
                    })
                  );
              navigate(`/`);
            }}
          >
            {followerMap?.includes(me?._id as string) ? "Unfollow" : "Follow"}
          </button> */}

          {/* FOLLOW */}
          <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            disabled={followerMap?.includes(me?._id as string)}
            onClick={() => {
              dispatch(
                follow({
                  followId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              );
              window.location.reload();
            }}
          >
            Follow
          </button>

          {/* UNFOLLOW */}
          <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            disabled={!followerMap?.includes(me?._id as string)}
            onClick={() => {
              dispatch(
                unfollow({
                  unfollowId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              );
            }}
          >
            Unfollow
          </button>
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
