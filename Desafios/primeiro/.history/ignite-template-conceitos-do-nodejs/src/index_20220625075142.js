const express = require("express");
const cors = require("cors");

const { v4: uuidv4, v4, stringify } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;
  const id = v4;
  const todos = [];

  const user = {
    id: v4,
    name: name,
    username: username,
    todos: todos,
  };
  response.json({ user });
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
