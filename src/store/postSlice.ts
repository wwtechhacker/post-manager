import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../components/types";

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      if (!state.posts.some((post) => post.id === action.payload.id))
        state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            status: action.payload.status,
          };
        }
        return post;
      });
    },
  },
});

export const { addPost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
