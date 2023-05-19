import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

// get user profile
const getProfile = async (id: string, token: string) => {
  const response = await API.get(`/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// follow a user
const followUser = async (followId: string, userId: string, token: string) => {
  const response = await API.put(
    `/api/v1/users/follow`,
    {
      followId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// unfollow a user
const unfollowUser = async (
  unfollowId: string,
  userId: string,
  token: string
) => {
  const response = await API.put(
    `/api/v1/users/unfollow`,
    {
      unfollowId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// update user profile
const updateUserProfile = async (userId: string, token: string) => {
  const response = await API.put(`/api/v1/users/update`, userId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// update user profile picture
const updateProfilePic = async (avatar: string, token: string) => {
  const response = await API.put(
    `/api/v1/users/updateProfilePic`,
    { avatar },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data) {
    localStorage.setItem("pic", JSON.stringify(response.data));
  }

  return response.data;
};
const userServices = {
  getProfile,
  followUser,
  unfollowUser,
  updateUserProfile,
  updateProfilePic,
};

export default userServices;
