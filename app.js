import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
//import dotenv from "dotenv";
import Post from './models/post.js'; // Import the Post model

//dotenv.config();
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ DB Connection Error:", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Reads the data from the form
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files from the public directory
app.set('view engine', 'ejs'); // tells express to use EJS as the template engine


// Routes will go here...

// Home route
app.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.render("home.ejs", { posts });
});
// this piece of code is used to render the home page with the posts


app.get('/new', (req, res) => {
    res.render('new.ejs');
});
// this piece of code is used to render the new post page
app.post("/create", async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect("/");
});

// Show edit form
app.get("/edit/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

// Save edited post
app.post("/edit/:id", async (req, res) => {
  const { title, content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect("/");
});

// Delete post
app.post("/delete/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
