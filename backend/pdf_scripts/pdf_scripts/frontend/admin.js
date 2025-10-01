// admin.js - Admin Dashboard

document.getElementById("listPdfsBtn").addEventListener("click", async () => {
  const listEl = document.getElementById("pdfList");
  listEl.innerHTML = "⏳ Loading PDFs...";

  try {
    const response = await fetch("http://localhost:3000/list-pdfs");
    if (!response.ok) {
      throw new Error("Failed to fetch PDFs");
    }

    const pdfs = await response.json();
    listEl.innerHTML = "";

    if (pdfs.length === 0) {
      listEl.innerHTML = "<li>No PDFs found!</li>";
      return;
    }

    pdfs.forEach(pdf => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `http://localhost:3000/pdfs/${pdf}`;
      link.textContent = pdf;
      link.target = "_blank";
      li.appendChild(link);
      listEl.appendChild(li);
    });
  } catch (error) {
    listEl.innerHTML = "❌ Error: " + error.message;
  }
});
