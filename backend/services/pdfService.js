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
  html = html
    .replace(/{{title}}/g, title || "Default Title")
    .replace(/{{content}}/g, content || "Default Content")
    .replace(/{{date}}/g, helpers.formatDate(new Date()));

    return pdfBuffer;

};
