const express = require("express");
const cors = require("cors");

const { v4: uuidv4, v4, stringify } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const userName = users.find((userName) => userName.username === username);
  if (!userName) {
    return response.status(400).json({ error: "User name not found" });
  }
  request.username = userName;
  return next();
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const id = uuidv4();
  const todos = [];

  const user = {
    id: id,
    name: name,
    username: username,
    todos: todos,
  };
  users.push(user);
  response.json({ users });
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request;

  return response.json(username.todos);
});
app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: v4,
    title: title,
    done: false,
    deadline: new Date(deadline).toString(),
    created_at: new Date(),
  };
  console.log(username);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
