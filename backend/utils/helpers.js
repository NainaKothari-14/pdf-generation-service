// Format date to readable string
exports.formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
};

// Generate unique PDF filename
exports.generateFileName = (prefix = 'pdf') => {
    return `${prefix}-${Date.now()}.pdf`;
};
