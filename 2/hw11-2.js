//docx-pdf (word to pdf)
    // npm install docx-pdf --save
    //Dependencies: html-pdf, mammoth
        // npm i html-pdf
        // npm i mammoth    
//PDF poppler (pdf to image)
    //npm i pdf-poppler



//Word to pdf:
var docxConverter = require('docx-pdf');

docxConverter('./WordFile.docx', './PdfFile.pdf', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('result: ' + result);
});



//pdf to image  

const path = require('path');
const pdf = require('pdf-poppler');

let file = path.join(__dirname, './PdfFile.pdf');

let opts = {
    format: 'jpeg',
    out_dir: path.dirname(file),
    out_prefix: path.basename(file, path.extname(file)),
    page: null
};

pdf.convert(file, opts)
    .then(res => {
        console.log('Successfully converted');
    })
    .catch(error => {
        console.error(error);
    })