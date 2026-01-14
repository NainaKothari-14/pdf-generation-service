# PDF Generation Service

A dynamic PDF generation microservice built with Node.js and React. Features multiple professional templates, real-time preview, and downloadable PDFs.

## Features

- Multiple template options (Default, Invoice, Certificate)
- Real-time template preview
- Professional, minimal designer layouts
- Instant PDF download
- Stateless microservice architecture
- Extensible for future enhancements

## Screenshots

<div align="center">

| Feature | Preview |
|---------|---------|
| Template Selection | ![template](screenshots/templateOptions.png#gh-light-mode-only) <img src="screenshots/templateOptions.png" width="200"> |
| PDF Generator | ![generator](screenshots/PDFGeneratorPage.png#gh-light-mode-only) <img src="screenshots/PDFGeneratorPage.png" width="200"> |
| Live Preview | ![preview](screenshots/LivePreview.png#gh-light-mode-only) <img src="screenshots/LivePreview.png" width="200"> |
| Certificate Template | ![certificate](screenshots/CertificateTemplate.png#gh-light-mode-only) <img src="screenshots/CertificateTemplate.png" width="200"> |
| Invoice Template | ![invoice](screenshots/InvoiceTemplate.png#gh-light-mode-only) <img src="screenshots/InvoiceTemplate.png" width="200"> |
| Generated PDF | ![pdf](screenshots/GeneratedPDF.png#gh-light-mode-only) <img src="screenshots/GeneratedPDF.png" width="200"> |

</div>

## How It Works

1. User selects a template from the dropdown
2. User enters Title and Content
3. Frontend displays live preview
4. User clicks "Download PDF"
5. Backend fills the HTML template with user data
6. PDF is generated and returned for download

## Tech Stack

- Backend: Node.js, Express
- Frontend: React, Vite
- PDF Generation: Puppeteer
- Templates: HTML + CSS

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5002`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Application runs on `http://localhost:5173`

## API Endpoints

### POST /pdf/generate

Generates and returns a PDF.

**Request Body:**
```json
{
  "title": "Invoice #123",
  "content": "This is your invoice",
  "template": "certificate"
}

```

**Response:** PDF file (blob)

## Templates

- **Default**: Simple document template with title and content sections
- **Invoice**: Professional invoice layout with company details
- **Certificate**: Formal certificate design with centered content

## Notes

- This service is stateless by design
- No data persistence by default
- Can be easily integrated with other applications
- PDF generation uses Puppeteer for reliable output

## Author

Naina Kothari

---

If you found this project helpful, please consider giving it a star on GitHub!

<a href="https://github.com"><img src="https://img.shields.io/badge/Star-on%20GitHub-yellow?style=flat-square&logo=github" alt="Star on GitHub"></a>
