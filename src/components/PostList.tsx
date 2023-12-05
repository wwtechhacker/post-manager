import { FC, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost } from "../store/postSlice";
import { CREATE_POST, GET_POSTS } from "./gql/post";
import { PostStatus } from "./const";
import { Post } from "./types";
import { RootState } from "../store";

export const PostList: FC = () => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      options: {
        paginate: {
          page: 19,
          limit: 5,
        },
      },
    },
  });
  const [createPost] = useMutation(CREATE_POST);

  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.posts && data.posts.data) {
      data.posts.data.forEach((post: Post) =>
        dispatch(addPost({ ...post, status: PostStatus.Done }))
      );
    }
  }, [data, dispatch]);

  const handleSubmit = async () => {
    const pendingPostList = posts.filter(
      (post) => post.status === PostStatus.Pending
    );
    const createPosts: any[] = [];
    pendingPostList.forEach((post) => {
      createPosts.push(
        createPost({
          variables: { input: { title: post.title, body: post.body } },
        })
      );
    });
    Promise.all(createPosts).then((values) => {
      console.log("values", values);
      // Below post update logic can go here when using real api.
    });
    pendingPostList.map((post) => {
      return dispatch(updatePost({ ...post, status: PostStatus.Done }));
    });
  };

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Something went wrong. Try again...</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div
          className="PostItem"
          style={{
            backgroundColor:
              post.status === PostStatus.Pending ? "#ffea00" : "#03a9f4",
          }}
          key={`post_${post.id}`}
        >
          <div className="PostTitle">{post.title}</div>
          <div className="PostBody">{post.body}</div>
        </div>
      ))}
      {posts.some((post) => post.status === PostStatus.Pending) && (
        <button onClick={handleSubmit}>submit all</button>
      )}
    </div>
  );
};
