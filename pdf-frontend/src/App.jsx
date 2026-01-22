import { useState } from "react";

function App() {
  const [title, setTitle] = useState("Invoice #001");
  const [content, setContent] = useState("Professional services rendered on the specified date. This is a detailed description of the work completed.");
  const [template, setTemplate] = useState("default");

  const templates = {
    default: `<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; }
.document { background: white; padding: 50px; border: 1px solid #e0e0e0; }
.header { font-size: 32px; font-weight: 600; margin-bottom: 10px; }
.date { font-size: 12px; color: #999; margin-bottom: 40px; }
.label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 30px; margin-bottom: 8px; font-weight: 600; }
.content { font-size: 14px; line-height: 1.6; color: #555; white-space: pre-wrap; }
.footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999; }
</style>
</head>
<body>
<div class="document">
<div class="header">{{title}}</div>
<div class="date">{{date}}</div>
<div class="label">Details</div>
<div class="content">{{content}}</div>
<div class="footer">Generated on {{date}}</div>
</div>
</body>
</html>`,
    invoice: `<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
.container { max-width: 900px; margin: 0 auto; background: white; padding: 60px; }
.header-top { display: flex; justify-content: space-between; align-items: start; margin-bottom: 50px; border-bottom: 2px solid #333; padding-bottom: 20px; }
.company-name { font-size: 28px; font-weight: 700; color: #333; }
.invoice-label { text-align: right; }
.invoice-no { font-size: 14px; color: #666; margin-bottom: 5px; }
.invoice-no strong { color: #333; font-weight: 600; }
.invoice-date { font-size: 14px; color: #666; }
.details { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.detail-section h3 { font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px; font-weight: 600; }
.detail-section p { margin: 5px 0; font-size: 14px; color: #333; line-height: 1.6; }
.title { font-size: 24px; font-weight: 700; color: #333; margin: 40px 0 30px; }
.content { font-size: 14px; line-height: 1.8; color: #555; margin-bottom: 40px; white-space: pre-wrap; }
.footer { border-top: 1px solid #e0e0e0; padding-top: 20px; font-size: 12px; color: #999; }
</style>
</head>
<body>
<div class="container">
<div class="header-top">
<div class="company-name">{{title}}</div>
<div class="invoice-label">
<div class="invoice-no"><strong>Invoice Date:</strong></div>
<div class="invoice-date">{{date}}</div>
</div>
</div>
<div class="details">
<div class="detail-section">
<h3>Bill To</h3>
<p>Client Information</p>
<p>Address Line</p>
<p>City, State ZIP</p>
</div>
<div class="detail-section">
<h3>From</h3>
<p>Your Company</p>
<p>Company Address</p>
<p>City, State ZIP</p>
</div>
</div>
<div class="title">Description</div>
<div class="content">{{content}}</div>
<div class="footer">
<p>Thank you for your business</p>
<p>© 2025 All rights reserved</p>
</div>
</div>
</body>
</html>`,
    certificate: `<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: 'Georgia', serif; margin: 0; padding: 40px; background: #f5f5f5; }
.certificate { background: white; max-width: 900px; margin: 0 auto; padding: 60px; border: 3px solid #d4a574; text-align: center; }
.title { font-size: 48px; font-weight: bold; color: #333; margin: 30px 0; }
.subtitle { font-size: 24px; color: #666; margin-bottom: 40px; font-style: italic; }
.recipient { font-size: 28px; font-weight: bold; color: #333; margin: 40px 0; text-decoration: underline; }
.content { font-size: 16px; line-height: 1.8; color: #555; margin: 40px 0; white-space: pre-wrap; }
.date { font-size: 14px; color: #666; margin-top: 60px; }
.footer { margin-top: 40px; font-size: 12px; color: #999; }
</style>
</head>
<body>
<div class="certificate">
<div class="title">Certificate of Achievement</div>
<div class="subtitle">This is to certify that</div>
<div class="recipient">{{title}}</div>
<div class="content">{{content}}</div>
<div class="date">Date: {{date}}</div>
<div class="footer">© 2025 Certificate Authority</div>
</div>
</body>
</html>`
  };

  const getPreviewHTML = () => {
    let html = templates[template];
    const today = new Date().toLocaleDateString();
    html = html.replace(/{{title}}/g, title);
    html = html.replace(/{{content}}/g, content);
    html = html.replace(/{{date}}/g, today);
    return html;
  };

  const generatePDF = async () => {
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      console.log("VITE_API_BASE_URL =", base);
  
      const res = await fetch(`${base}/pdf/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, template }),
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error("Backend returned:", res.status, text);
        alert(`Backend error ${res.status}: ${text}`);
        return;
      }
  
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "generated.pdf";
      a.click();
    } catch (e) {
      console.error("Request failed:", e);
      alert("Request failed (CORS/URL/network). Open Console (F12) for details.");
    }
  };  

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "1400px", margin: "0 auto" }}>
      <h1> PDF Generator</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Input Section */}
        <div>
          <div style={{ marginBottom: "1.5rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Template:</label>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", fontSize: "14px", borderRadius: "4px", border: "1px solid #ddd" }}
            >
              <option value="default">Default</option>
              <option value="invoice">Invoice</option>
              <option value="certificate">Certificate</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.5rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: "0.75rem", fontSize: "14px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
              placeholder="Enter title..."
            />
          </div>

          <div style={{ marginBottom: "1.5rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              style={{ width: "100%", padding: "0.75rem", fontSize: "14px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box", fontFamily: "inherit" }}
              placeholder="Enter content..."
            />
          </div>

          <button 
            onClick={generatePDF}
            style={{ 
              width: "100%", 
              padding: "0.75rem", 
              background: "#333", 
              color: "white", 
              border: "none", 
              borderRadius: "4px", 
              fontSize: "16px", 
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#555"}
            onMouseOut={(e) => e.target.style.background = "#333"}
          >
            Download PDF
          </button>
        </div>

        {/* Preview Section */}
        <div>
          <div style={{ padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", height: "100%" }}>
            <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>Live Preview</h3>
            <div style={{ border: "1px solid #ddd", borderRadius: "4px", overflow: "hidden" }}>
              <iframe
                srcDoc={getPreviewHTML()}
                style={{ 
                  width: "100%", 
                  height: "600px", 
                  border: "none",
                  background: "white"
                }}
                title="PDF Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;