const express = require("express");
const cors = require("cors");

const { v4: uuidv4, v4, stringify } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return response.status(404).json({ error: "User not found" });
  }
  request.user = user;
  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const verify = users.find((user) => user.username === username);

  if (verify) {
    return response.status(400).json({ error: "Username Already Exists" });
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request;

  return response.status(200).json(username.todos);
});
app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  username.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title, deadline } = request.body;
  const { id } = request.params;

  const todo = username.todos.find((todo) => todo.username === username);

  todo.title = title;
  todo.deadline = new Date(deadline);
  todo.updated_at = new Date();

  return response.json({ success: "update successffully" });
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;

  username.todos.filter((todo) => {
    if (todo.id === id) {
      todo.done = true;
      return response.status(200).json({ success: "Update successffully" });
    }
  });
  return response.status(200).json({ error: "to do invalid" });
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { id } = request.params;
  username.todos.filter((todo) => {
    if (todo.id === id) {
      username.todos.splice(todo, 1);
      return response.status(204).json();
    }
  });

  return response.status(404).json({ error: "Todo not found" });
});

module.exports = app;
