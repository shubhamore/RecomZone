const express = require("express");
const ContentBasedRecommender = require("content-based-recommender");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/recommendations", (req, res) => {
  const csvBase64 = req.query.csvData; // assuming the encoded data is sent in the query with key 'csvData'
  const id = req.query.id; // assuming the id is sent in the query with key 'id'
  const csv = Buffer.from(csvBase64, "base64").toString("utf-8");
  const rows = csv.split("\n").slice(1);
  const documents = [];

  rows.forEach((row, index) => {
    const document = {
      id: index + 1,
      content: row,
    };
    documents.push(document);
  });

  const recommender = new ContentBasedRecommender({
    maxSimilarDocuments: 100,
  });

  recommender.train(documents);
  const similarDocuments = recommender.getSimilarDocuments(id, 0, 10);
  console.log("similarDocuments=",similarDocuments)
  res.json({ csv, similarDocuments });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
