// checklist.js - Generate checklist as PDF
const { generatePDF } = require("./pdfGen");

async function generateChecklist(items, filePath) {
  const checklistContent = items
    .map((item, index) => `${index + 1}. [ ] ${item}`)
    .join("\n");

  return generatePDF("Checklist:\n\n" + checklistContent, filePath);
}

module.exports = { generateChecklist };
