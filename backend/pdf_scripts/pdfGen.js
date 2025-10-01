// pdfGen.js - Utility to generate PDFs
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function generatePDF(content, filePath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Title
      doc.fontSize(20).text("AI Generated PDF", { align: "center" });
      doc.moveDown();

      // Content
      doc.fontSize(12).text(content, {
        align: "left",
        lineGap: 6,
      });

      doc.end();

      stream.on("finish", () => {
        console.log("✅ PDF Generated:", filePath);
        resolve(true);
      });

      stream.on("error", (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generatePDF };
