const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const productionOrigin = 'https://recom-zone.vercel.app';
const developmentOrigin = 'http://localhost:3000';

const allowedOrigin = process.env.NODE_ENV === 'production' ? productionOrigin : developmentOrigin;

app.use(cors({
  origin: allowedOrigin,
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.use("/cbf/", require("./routes/cbf"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
