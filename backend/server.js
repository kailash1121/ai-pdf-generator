// server.js - Backend (Node.js + Express)

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { generatePDF } = require("./pdf_scripts/pdfGen");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// PDF output folder
const pdfDir = path.join(__dirname, "generated_pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// 🟢 API to Generate PDF
app.post("/generate-pdf", async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).send("No content provided");
    }

    const fileName = `pdf_${Date.now()}.pdf`;
    const filePath = path.join(pdfDir, fileName);

    await generatePDF(content, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("❌ Error sending PDF:", err);
      }
    });
  } catch (err) {
    console.error("❌ PDF generation failed:", err);
    res.status(500).send("Error generating PDF");
  }
});

// 🟢 API to List All PDFs
app.get("/list-pdfs", (req, res) => {
  try {
    fs.readdir(pdfDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: "Unable to scan PDFs" });
      }
      res.json(files);
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Serve frontend (index.html as default)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
