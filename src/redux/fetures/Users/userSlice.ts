import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userServices from "./userServices";
import { Post } from "../Posts/postSlice";
import { userProfileData } from "../../../interfaces/AuthInterface";

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
export const follow = createAsyncThunk(
  "auth/follow",
  async ({ followId, userId, token }: any, thunkAPI) => {
    try {
      const response = await userServices.followUser(followId, userId, token);
      // thunkAPI.dispatch(userDataProfile({ id: userId, token: token } as any));
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

// unfollow
export const unfollow = createAsyncThunk(
  "auth/unfollow",
  async ({ unfollowId, userId, token }: any, thunkAPI) => {
    try {
      const response = await userServices.unfollowUser(
        unfollowId,
        userId,
        token
      );
      // thunkAPI.dispatch(userDataProfile({ id: userId, token: token } as any));
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

// update profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, token }: any, thunkAPI) => {
    try {
      const response = await userServices.updateUserProfile(userId, token);
      thunkAPI.dispatch(userProfile({ id: userId, token: token } as any));
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

// update profile pic
export const updateProfilePic = createAsyncThunk(
  "auth/updateProfilePic",
  async ({ avatar, token }: any, thunkAPI) => {
    try {
      const response = await userServices.updateProfilePic(avatar, token);

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

// User Slice
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
      // state.user?.user?.followers?.push(payload._id as string);
      // state.user!.user!.followers!.push(payload._id as string);
      if (state.user) {
        state.user.user?.followers?.push(payload._id as string);
      }
      const newdata = state.user?.posts?.map((post: Post) => {
        if (post?._id === payload?.data?._id) {
          return payload?.data;
        }

        return post;
      });

      state.user!.posts = newdata as Post[];
    });
    builder.addCase(follow.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // unfollow
    builder.addCase(unfollow.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(unfollow.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      // state.user?.user?.followers?.pop();
      state.user?.user?.followers?.includes(payload._id as string) &&
        state.user?.user?.followers?.splice(
          state.user?.user?.followers?.indexOf(payload._id as string),
          1
        );
      state.user!.user!.followers!.pop();
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
    builder.addCase(unfollow.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(updateProfile.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // update profile pic
    builder.addCase(updateProfilePic.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfilePic.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(updateProfilePic.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
