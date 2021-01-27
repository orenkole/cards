import Post from "./Post.js";
import "./styles/styles.css";
import "./styles/styles.scss";

const post = new Post("Webpack Post Title");

console.log("Post to string:", post.toString());
