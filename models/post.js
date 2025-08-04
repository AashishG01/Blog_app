import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = new mongoose.model("Post", postSchema);

export default Post;
// This code defines a Mongoose schema for posts, which 
// includes title, content, and createdAt fields. The 
// title and content are required, and createdAt defaults to
//  the current date and time. The schema is then exported
//  as a Mongoose model named "Post". This model can be used
//  to interact with the posts collection in MongoDB.