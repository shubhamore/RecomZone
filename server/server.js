const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/cbf/", require("./routes/cbf"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
