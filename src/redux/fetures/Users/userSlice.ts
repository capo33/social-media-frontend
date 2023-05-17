import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "./userServices";
import { Auth, User, userProfileData } from "../../../interfaces/AuthInterface";
import { Post } from "../Posts/postSlice";

const user = JSON.parse(localStorage.getItem("user") as string);

interface AccountState {
  user: userProfileData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AccountState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// *************************** User *************************** //
// userProfile
interface UserProfile {
  id: string;
  token: string;
}
export const userProfile = createAsyncThunk(
  "auth/userProfile",
  async ({ id, token }: any, { rejectWithValue }) => {
    try {
      const response = await userServices.getProfile(id, token);
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

// follow
interface Follow {
  id: string;
  token: string;
  followId: string;
}
export const follow = createAsyncThunk(
  "auth/follow",
  async ({ followId,userId, token }: any, { rejectWithValue }) => {
    try {
      const response = await userServices.followUser(followId,userId, token);
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

// unfollow
interface Unfollow {
  id: string;
  token: string;
  unfollowId: string;
}
export const unfollow = createAsyncThunk(
  "auth/unfollow",
  async ({ unfollowId, token }: any, { rejectWithValue }) => {
    try {
      const response = await userServices.unfollowUser(unfollowId, token);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // userProfile
    builder.addCase(userProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(userProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // follow
    builder.addCase(follow.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(follow.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      // if (state.user) {
      //   state.user.user?.followers?.push(payload._id as string);
      // }
      // const newdata = state.user?.posts?.map((post: Post) => {
      //   if (post?._id === payload?.data?._id) {
      //     return payload?.data;
      //   }

      //   return post;
      // });
      
      // state.user!.posts = newdata as Post[];
      // state.user!.user!.followers!.push(payload._id as string);
     });
    builder.addCase(follow.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
