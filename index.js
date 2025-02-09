const { createWorker } = require('tesseract.js');

async function ocr(url) {
  try {
  const worker = await createWorker('eng');
  const ret = await worker.recognize(url);
  console.log(ret.data.text);
  return ret.data.text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  }
}

module.exports = ocr;
