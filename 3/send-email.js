// using g-mail sender
// Dependencies: Lodash, Nodemailer
// npm install --save gmail-send
// npm i --save lodash
// npm i nodemailer

const send = require('gmail-send')({
    user: 'chehregosha1996@gmail.com',
    // pass: 'abcdefghijklmnop',
    to: 's.chehregosha@yahoo.com',
    subject: 'test subject',
});

send({
    text: 'gmail-send example 1',
}, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
})