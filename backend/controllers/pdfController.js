const pdfService = require('../services/pdfService');

exports.generatePDF = async (req, res) => {
    try {
        const { title, content, template } = req.body; // Make sure template is here
        console.log("Template received:", template);  // 🔹 Debugging line
        const pdfBuffer = await pdfService.createPDF({ title, content, template });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
        res.send(pdfBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};