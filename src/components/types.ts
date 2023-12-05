import { PostStatus } from "./const";

export interface Post {
  id: string;
  title: string;
  body: string;
  status?: PostStatus;
}
