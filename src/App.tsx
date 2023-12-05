import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PostList />
      <CreatePost />
    </div>
  );
}

export default App;
