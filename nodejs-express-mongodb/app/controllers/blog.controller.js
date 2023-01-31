const db = require("../models");
const Blog = db.blogs;

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Blog
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Blog in the database
  blog
    .save(blog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog."
      });
    });
};

// Retrieve all blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const author = req.query.author;
  const updatedAt = req.query.updatedAt;
  

  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : 
  author ? {author: { $regex: new RegExp(author), $options: "i" }} : {};
  updatedAt ? {updatedAt: { $regex: new RegExp(updatedAt), $options: "i" }} : {};

  Blog.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Blog with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Blog with id=" + id });
    });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Blog with id=${id}. Maybe Blog was not found!`
        });
      } else res.send({ message: "Blog was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Blog with id=" + id
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`
        });
      } else {
        res.send({
          message: "Blog was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blog with id=" + id
      });
    });
};

// Delete all blogs from the database.
exports.deleteAll = (req, res) => {
  Blog.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} blogs were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all blogs."
      });
    });
};

// Find all published blogs
exports.findAllPublished = (req, res) => {
  Blog.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blogs."
      });
    });
};
