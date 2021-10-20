const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// express app
const app = express();

const dbURI =
  "mongodb+srv://ari:password123456@cluster0.ivwqm.mongodb.net/cats?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// listen for requests

// register view engine
app.set("view engine", "ejs");
// app.set('views', 'myviews');

app.use(express.static("public"));

app.get("./add-blog", (req, res) => {
  const blog = new Blog({
    title: "My first blog",
    snippet: "This is my first snippet blog",
    body: "This is my first blog",
  });

  blog.save();
});

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
