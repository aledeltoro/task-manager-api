const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");
require("./db/mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// We need to mark our functions with the "async" keyword

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  // We can handle individual errors from individual promises with the "try-catch" statement
  try {
    await user.save(); // The code after this function will only run if the promise was fulfilled, otherwise, the code will stop
    res.status(201).send(user); // If the promise is fulfilled this response will be sent
  } catch(error) {
    // If the "save" promise throw an error, then this response will be sent
    res.status(400).send(error);
  }
  
  // We need to refactor this code
  // user.save()
  //   .then((user) => {
  //     res.status(201).send(user);
  //   })
  //   .catch((err) => {
  //     res.status(400).send(err);
  //   });
});

app.get("/users", async (req, res) => {
    


  // User.find({})
  //   .then((users) => {
  //     res.status(200).send(users);
  //   })
  //   .catch((err) => {
  //     res.status(500).send();
  //   });
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task.save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }

      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
