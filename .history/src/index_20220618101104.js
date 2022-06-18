const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Ignite" });
});

app.listen(3000);
