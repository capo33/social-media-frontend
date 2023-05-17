import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postServices from "./postServices";

interface comments {
  comment: string;
  postedBy?: {
    name: string;
    _id: string;
  };
  _id?: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  comments: comments[];

  postedBy?: {
    name: string;
    _id?: string;
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

interface PostPayload {
  likes?: string[];
  comments?: comments[];
  postID?: string;
  title?: string;
  description?: string;
  image?: string;
  token?: string;
  toast?: any;
  navigate?: any;
}

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
      return rejectWithValue(message);
    }
  }
);

// like a post
interface LikePost {
  postID: string;
  token: any;
}
export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postID, token }: LikePost, thunkAPI) => {
    try {
      const response = await postServices.likePost(postID, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// unlike a post
interface UnlikePost {
  postID: string;
  token: any;
}
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async ({ postID, token }: UnlikePost, thunkAPI) => {
    try {
      const response = await postServices.unlikePost(postID, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// comment on a post
interface CommentPost {
  postID: string;
  comment: string;
  token: any;
}
export const commentPost = createAsyncThunk(
  "posts/commentPost",
  async ({ comment, postID, token }: CommentPost, thunkAPI) => {
    try {
      const response = await postServices.commentPost(comment, postID, token);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// uncomment on a post
interface UnCommentPost {
  postId: string;
  commentId: string;
  token: any;
}
export const deleteCommentPost = createAsyncThunk(
  "posts/deleteCommentPost",
  async ({ postId, commentId, token }: UnCommentPost, thunkAPI) => {
    try {
      const response = await postServices.deleteCommentPost(
        postId,
        commentId,
        token
      );
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

interface DeletePost {
  postID: string;
  token: any;
  toast: any;
}
// delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postID, token, toast }: DeletePost, thunkAPI) => {
    try {
      const response = await postServices.deletePost(postID, token);
      toast.success(response?.message);
      thunkAPI.dispatch(getAllPosts());
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all posts
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

    // delete a post
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

    // delete a post
    builder.addCase(deletePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.posts = state.posts.filter(
        (post: Post) => post?._id !== action.payload?.data?._id
      );
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // like a post
    builder.addCase(likePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: Post) => {
        if (post?._id === action.payload?.data?._id) {
          return action.payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(likePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // unlike a post
    builder.addCase(unlikePost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: Post) => {
        if (post?._id === action.payload?.data?._id) {
          return action.payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(unlikePost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // comment on a post
    builder.addCase(commentPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(commentPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: Post) => {
        if (post?._id === action.payload?.data?._id) {
          return action.payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(commentPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // uncomment on a post
    builder.addCase(deleteCommentPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCommentPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      const newdata = state.posts.map((post: Post) => {
        if (post?._id === action.payload?.data?._id) {
          return action.payload?.data;
        }
        return post;
      });
      state.posts = newdata;
    });
    builder.addCase(deleteCommentPost.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export default postSlice.reducer;
