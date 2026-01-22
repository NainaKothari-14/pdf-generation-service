const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const helpers = require("../utils/helpers");

exports.createPDF = async ({ title, content, template = "default" }) => {
  const templatePath = path.join(__dirname, `../templates/${template}.html`);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${template}`);
  }

  let html = fs.readFileSync(templatePath, "utf8");

  // Replace all placeholders (global)
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

    // Render free can be slow
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(60000);

    // Block any external requests (fonts/images/CDNs) so it never hangs
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const url = req.url();
      if (url.startsWith("http://") || url.startsWith("https://")) return req.abort();
      req.continue();
    });

    // ✅ IMPORTANT: do NOT use networkidle0
    await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 60000 });

    // small settle time
    await new Promise((r) => setTimeout(r, 200));

    return await page.pdf({ format: "A4", printBackground: true });
  } finally {
    if (browser) await browser.close();
  }
};
