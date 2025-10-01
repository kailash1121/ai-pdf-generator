// script.js - User Side (Generate PDF)

document.getElementById("generateBtn").addEventListener("click", async () => {
  const text = document.getElementById("textInput").value;

  if (!text.trim()) {
    document.getElementById("result").innerText = "⚠️ Please enter some text!";
    return;
  }

  document.getElementById("result").innerText = "⏳ Generating PDF...";

  try {
    const response = await fetch("http://localhost:3000/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: text })
    });

    if (!response.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Download link create karo
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated.pdf";
    a.click();

    document.getElementById("result").innerText = "✅ PDF Generated Successfully!";
  } catch (error) {
    document.getElementById("result").innerText = "❌ Error: " + error.message;
  }
});
