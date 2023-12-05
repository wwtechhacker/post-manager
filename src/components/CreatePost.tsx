import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addPost } from "../store/postSlice";
import { PostStatus } from "./const";

export const CreatePost: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const dispatch = useDispatch();

  const handleSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSetBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleAddNewPost = () => {
    if (!title || !body) {
      return;
    }
    dispatch(
      addPost({ id: uuidv4(), title, body, status: PostStatus.Pending })
    );
    setTitle("");
    setBody("");
  };

  return (
    <div className="CreatePost">
      <div>
        <label htmlFor="add-post-title">title</label>
        <input
          id="add-post-title"
          type="text"
          value={title}
          onChange={handleSetTitle}
        />
      </div>
      <div>
        <label htmlFor="add-post-body">body</label>
        <input
          id="add-post-body"
          type="text"
          value={body}
          onChange={handleSetBody}
        />
      </div>
      <button onClick={handleAddNewPost}>Add a new post</button>
    </div>
  );
};
