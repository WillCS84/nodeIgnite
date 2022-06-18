const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const custommers = [];

app.use(express.json());

/**
 * cpf  - string
 * name - string
 * id   - uuid
 * statement []
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const id = uuidv4();

  custommers.push({
    cpf,
    name,
    id,
    statement: [],
  });
});

app.listen(3000);
