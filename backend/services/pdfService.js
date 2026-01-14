const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const helpers = require('../utils/helpers');

exports.createPDF = async ({ title, content, template = 'default' }) => {
    // ✅ Path to the selected template
    const templatePath = path.join(__dirname, `../templates/${template}.html`);

    // Read HTML template
    let html = fs.readFileSync(templatePath, 'utf8');

    // Replace placeholders in HTML
    html = html.replace('{{title}}', title || 'Default Title')
               .replace('{{content}}', content || 'Default Content')
               .replace('{{date}}', helpers.formatDate(new Date()));

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

    await browser.close();

    return pdfBuffer; // Return the PDF buffer
};
