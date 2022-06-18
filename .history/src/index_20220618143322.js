const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const customers = [];

app.use(express.json());

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }
  request.customer = customer;
  return next();
}

/**
 * cpf  - string
 * name - string
 * id   - uuid
 * statement []
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });
  return response.status(201).send();
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const statementOperations = {
    description,
    amount,
    created_at: newDate(),
    type: "credit",
  };
});

app.listen(3000);
