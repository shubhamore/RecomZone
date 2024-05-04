const ContentBasedRecommender = require("content-based-recommender");

const recommendations= async (req, res) => {
  // console.log("req.body=",req.body)
  const { csvData, id } = req.body;
  // console.log("id=",id)

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
}

module.exports = { recommendations };