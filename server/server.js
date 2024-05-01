const express = require("express");
const ContentBasedRecommender = require("content-based-recommender");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 5000;
// const upload=multer({des})
app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post("/recommendations", (req, res) => {
  // console.log("req.body=",req.body)
  const { csvData, id } = req.body;
  console.log("id=",id)

  const csv = Buffer.from(req.body.csvData, "base64").toString("utf-8");
  // console.log("csv=",csv)
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
  // console.log("similarDocuments=",similarDocuments)
  res.json({ csv, similarDocuments });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
