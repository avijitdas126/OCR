const Tesseract =require('tesseract.js')
 
function ocr(url, lang = 'eng') {
    return Tesseract.recognize(
      url,
      lang,
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      return text;
    }).catch(error => {
      console.error('OCR Error:', error);
      throw error;
    });
  }
module.exports=ocr
