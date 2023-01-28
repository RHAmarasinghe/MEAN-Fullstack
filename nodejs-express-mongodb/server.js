const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:8081']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('myId', socket.id);


  socket.on('message', ({message, username}) => {
      console.log(username);
      console.log(message);
      const sockitID = socket.id;
      console.log(sockitID);
      io.emit('message', `${username} :   ${message}`);
      io.emit('user', username);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "Rashmi-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rashmi application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/blog.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}