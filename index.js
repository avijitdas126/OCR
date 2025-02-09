const tesseract = require('node-tesseract-ocr');

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
};

async function ocr(filePath) {
  try {
    const text = await tesseract.recognize(filePath, config);
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
}

module.exports = ocr;
