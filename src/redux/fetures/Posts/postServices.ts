import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthUser } from "../../../interfaces/AuthInterface";

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

const postServices = {
  getAllPosts,
  createPost,
};

export default postServices;
