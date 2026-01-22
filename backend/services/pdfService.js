const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const helpers = require("../utils/helpers");

exports.createPDF = async ({ title, content, template = "default" }) => {
  const templatePath = path.join(__dirname, `../templates/${template}.html`);

  let html = fs.readFileSync(templatePath, "utf8");

  html = html
    .replace(/{{title}}/g, title || "Default Title")
    .replace(/{{content}}/g, content || "Default Content")
    .replace(/{{date}}/g, helpers.formatDate(new Date()));

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--no-zygote",
      ],
    });

    const page = await browser.newPage();

    // ✅ FIX: avoid networkidle0 on Render (causes 30s timeout)
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // small wait to let layout settle
    await page.waitForTimeout(200);

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    return pdfBuffer;
  } finally {
    if (browser) await browser.close();
  }
};
