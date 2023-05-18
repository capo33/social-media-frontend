import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/store";
import {
  follow,
  unfollow,
  userProfile,
} from "../redux/fetures/Users/userSlice";
import { getAllPosts } from "../redux/fetures/Posts/postSlice";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isSuccess } = useAppSelector((state) => state.user);
  const { user: me } = useAppSelector((state) => state.auth);
  const { posts } = useAppSelector((state) => state.posts);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const followerMap = user?.user?.followers?.map(
    (follower: any) => follower?._id
  );
  // console.log(user?.user?._id === id);

  console.log("followerMap", followerMap?.includes(user?.user?._id as string));
  // console.log("user?.user?.followers", user?.user?.followers);
  // console.log("me", me );

  // console.log(followerMap?.includes( user?.user?._id as string));
  console.log(followerMap?.includes(user?.user?._id as string));
  console.log(followerMap?.includes(me?._id as string));
  console.log("followers", followers);

  // console.log(
  //   "user?.user?.followers",
  //   user?.user?.followers?.includes(me?._id as string)
  // );

  const dispatch = useAppDispatch();
  // console.log("user?.user-id", user?.user?._id);
  // console.log("me", me?._id);

  const token = me?.token;
  console.log(token);

  useEffect(() => {
    // fetch user data
    dispatch(getAllPosts());
    dispatch(userProfile({ id, token }));
  }, [dispatch, id, token]);

  const handleFollow = (followId: string, userId: string) => {
    dispatch(follow({ followId, userId, token }));
    // setIsFollowed(true);
  };

  const handleUnfollow = (followId: string, userId: string) => {
    dispatch(unfollow({ followId, userId, token }));
    // setIsFollowed(false);
  };
  console.log(
    "followers?.find((follower) => follower === me?._id)",
    followers?.find((follower) => follower === me?._id)
  );

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
          <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(followerMap?.includes(me?._id as string) && {})}
            // disabled={isSuccess ? true : false}
            // disabled={followerMap?.includes(me?._id as string) ? true : true}
            onClick={() => {
              followerMap?.includes(me?._id as string) ? (

              dispatch(
                unfollow({
                  unfollowId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              )
              ) : (
                dispatch(
                  follow({
                    followId: id,
                    userId: me?._id,
                    token: me?.token,
                  })
                )
              )
               navigate(`/`);
            }}
          >
            {followerMap?.includes(me?._id as string) ? "Unfollow" : "Follow"}
          </button>

          {/* <button
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
          </button> */}
          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(followerMap?.includes(me?._id as string) && {})}
            // disabled={isSuccess ? true : false}
            // disabled={!followerMap?.includes(me?._id as string)}
            onClick={() =>{
              followerMap?.includes(me?._id as string) ?
              dispatch(
                unfollow({
                  unfollowId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              ) :
              dispatch(
                follow({
                  followId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              )
                window.location.reload();
            }

            }
          >
            {followerMap?.includes(me?._id as string) ? "Unfollow" : "Follow"}
          </button> */}
          {/* {followerMap?.includes(me?._id as string) ? (
          ) : (
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              style={{ margin: "10px" }}
              // {...(user?.user?.followers?.includes(me?._id!) && {
              //   disabled: true,
              // })}
              // disabled={isSuccess ? true : false}
              disabled={followerMap?.includes(me?._id as string)}
              onClick={() => dispatch(
                follow({
                  followId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              )}
            >
              Follow
            </button>
          )} */}
          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(followerMap?.includes(me?._id as string) && {})}
            // disabled={isSuccess ? true : false}
            // disabled={!followerMap?.includes(me?._id as string)}
            onClick={
              () => {
                dispatch(
                  unfollow({
                    unfollowId: id,
                    userId: me?._id,
                    token: me?.token,
                  })
                );
                // window.location.reload();
                // dispatch(userProfile({ id, token }));
              }
              // handleUnfollow(id as string, me?._id as string)
            }
          >
            Unfollow
          </button> */}

          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(user?.user?.followers?.includes(me?._id!) && {
            //   disabled: true,
            // })}
            disabled={followerMap?.includes(me?._id as string)}
            // disabled={isSuccess}
            onClick={() => {
              dispatch(
                follow({
                  followId: id,
                  userId: me?._id,
                  token: me?.token,
                })
              );
                navigate(path);
                // path === `/profile/${id}` && window.location.reload();
            }}
          >
            Follow
          </button> */}

          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(followerMap?.includes(me?._id as string) && {})}
            // disabled={isFollowed ? true : false}

            onClick={
              () =>
                dispatch(
                  unfollow({
                    unfollowId: id,
                    userId: me?._id,
                    token: me?.token,
                  })
                )
              // handleUnfollow(id as string, me?._id as string)
            }
          >
            Unfollow
          </button> */}
          {/* <button
            className='btn waves-effect waves-light #64b5f6 blue darken-1'
            style={{ margin: "10px" }}
            // {...(user?.user?.followers?.includes(me?._id!) && {
            //   disabled: true,
            // })}
            disabled={followerMap?.includes(me?._id as string)}
            onClick={
              () =>
                dispatch(
                  follow({
                    followId: id,
                    userId: me?._id,
                    token: me?.token,
                  })
                )
              // add two argument
              // handleFollow(id as string, me?._id as string)
            }
          >
            Follow
          </button> */}
          {/* {followerMap?.includes(me?._id as string) ? (
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              style={{ margin: "10px" }}
              {...(followerMap?.includes(me?._id as string) && {})}
              disabled={isFollowed ? true : false}
              // disabled={followerMap?.includes( me?._id as string)}
              onClick={() =>
                // dispatch(
                //   unfollow({
                //     unfollowId: id,
                //     userId: me?._id,
                //     token: me?.token,
                //   })
                // )
                handleUnfollow(id as string, me?._id as string)
              }
            >
              Unfollow
            </button>
          ) : (
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              style={{ margin: "10px" }}
              // {...(user?.user?.followers?.includes(me?._id!) && {
              //   disabled: true,
              // })}
              onClick={() =>
                // dispatch(
                //   follow({
                //     followId: id,
                //     userId: me?._id,
                //     token: me?.token,
                //   })
                // )
                // add two argument
                handleFollow(id as string, me?._id as string)
              }
            >
              Follow
            </button>
          )} */}

          {/* {showFollow ? (
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
