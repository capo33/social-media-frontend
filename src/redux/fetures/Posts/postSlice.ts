import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postServices from "./postServices";

interface comments {
  comment: string;
  postedBy: {
    name: string;
    _id: string;
  };
  _id?: string;
}

interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  comments: comments[];

  postedBy: {
    name: string;
    _id: string;
  };
}

interface PostState {
  posts: Post[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;

  message: string;
}

const initialState: PostState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all posts
export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postServices.getAllPosts();

      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// create a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (
    { title, description, image, token, toast, navigate }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await postServices.createPost(
        title,
        description,
        image,
        token
      );
      toast.success(response?.message);
      navigate("/");
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      toast.error("Something went wrong");
      return rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload;
    });
    builder.addCase(getAllPosts.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = payload.data;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default postSlice.reducer;
