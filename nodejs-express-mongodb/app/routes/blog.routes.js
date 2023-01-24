module.exports = app => {
  const blogs = require("../controllers/blog.controller.js");

  var router = require("express").Router();

  // Create a new blog
  router.post("/", blogs.create);

  // Retrieve all blogs
  router.get("/", blogs.findAll);

  // Retrieve all published blogs
  router.get("/published", blogs.findAllPublished);

  // Retrieve a single blog with id
  router.get("/:id", blogs.findOne);

  // Update a blog with id
  router.put("/:id", blogs.update);

  // Delete a blog with id
  router.delete("/:id", blogs.delete);

  // Create a new blog
  router.delete("/", blogs.deleteAll);

  app.use("/api/blogs", router);
};