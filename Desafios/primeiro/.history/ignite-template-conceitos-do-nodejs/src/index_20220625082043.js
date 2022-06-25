const express = require("express");
const cors = require("cors");

const { v4: uuidv4, v4, stringify } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = {
  id: stringify,
  name: String,
  username: String,
  todos: [],
};

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  console.log(username);
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
  response.json({ users });
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;

  response.json({ username });
});
app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
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
