const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.json([curso1, curso2, curso3]);
});

app.listen(3000);
