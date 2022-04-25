const express = require("express");
const app = express();

const DEPLOY = true;
const buildPath = DEPLOY ? "./dist" : "./frontend/build";

app.use(express.static(buildPath));
app.use(express.static(buildPath + "static/"));

app.set('port', (process.env.PORT || 5000));
console.log(__dirname);

app.get("/", (req, res) => {
  console.log("ss");

  res.sendFile(`${buildPath}/index.html`, (err) => {
    res.json({"error": err})
  });
})

app.listen(app.get('port'));