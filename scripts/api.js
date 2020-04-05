const express = require("express");
const app = express();
const port = 3000;

const loop = require("./loop");

app.get("/:loops/:chars", (request, response) => {
  loop(request.params.loops, request.params.chars)
    .then((data) => {
      console.log({ data });
      response.send(data);
    })
    .catch(response.send);
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
