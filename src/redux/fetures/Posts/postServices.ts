import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Get all posts
const getAllPosts = async () => {
  const response = await API.get(`/api/v1/posts`);
  return response.data;
};

// Ceate a post with image upload from cloudinary
const createPost = async (
  title: string,
  description: string,
  image: string,
  token: string
) => {
  const response = await API.post(
    `/api/v1/posts`,
    {
      title,
      description,
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("response.data", response.data);

  return response.data;
};

// delete a post
const deletePost = async (postID: string, token: string) => {
  const response = await API.delete(`/api/v1/posts/delete-post/${postID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// like a post
const likePost = async (id: string, token: string) => {
  const response = await API.put(
    `/api/v1/posts/like`,
    {
      postId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// unlike a post
const unlikePost = async (id: string, token: string) => {
  const response = await API.put(
    `/api/v1/posts/unlike`,
    {
      postId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// comment on a post
const commentPost = async (comment: string, id: string, token: string) => {
  const response = await API.put(
    `/api/v1/posts/comment`,
    {
      comment,
      postId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// deleteComment a post
const deleteCommentPost = async (
  postId: string,
  commentId: string,
  token: string
) => {
  const response = await API.delete(
    `/api/v1/posts/comment/${postId}/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const postServices = {
  getAllPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteCommentPost,
};

export default postServices;
