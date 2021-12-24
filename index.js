const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");

app.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send("Hello world <button href='/form'>Submit</button>");
  res.end();
});

app.get("/form", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(
    "<form action='/submit' method='POST'><input name='data'/><input name='data2' /><button>Submit</button></form>"
  );
  res.send("Data Received");
  res.end();
});
app.post("/submit", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  let mydata = "";
  req.on("mydata", (chunk) => {
    mydata += chunk;
  });
  req.on("end", () => {
    fs.readFile("data.txt", "utf8", (err, oldData) => {
      const newData = oldData + "\n" + mydata;
    fs.writeFile(filePath, newData, () => {
      console.log("Saved");
      });
    });
  });
  res.write("Data Received");
  res.end();
});

app.listen(port, function () {
  console.log("Server listening on http://localhost:" + port);
});

//commit