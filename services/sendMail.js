var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
const mongoose = require("mongoose");

module.exports = {
    sendOTPMail: function (email, number) {

        console.log("inside sendMail");

        const template = './services/otpMail.ejs';


        var readHTMLFile = function (template, callback) {
            fs.readFile(template, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };

        var transport = nodemailer.createTransport({
            host: 'smtp.geips.ge.com',
            port: 25
        });


        readHTMLFile(template, function (err, html) {

            var template = handlebars.compile(html);
            var replacements = {
                otp: number
            };
            var htmlToSend = template(replacements);

            //var smtpTransport = require('nodemailer-smtp-transport');
            //process.env.MAIL_URL='smtp://:' + encodeURIComponent("Nodemailer123") + '@smtp.geips.ge.com:25';

            // ejs.renderFile(template, 'utf8', (err, html) => {
            //     if (err) console.log(err); // Handle error

            //     console.log(`HTML: ${html}`);

            var message = {

                // sender info
                from: 'capgemini-noreply@deployer.com',

                // Comma separated list of recipients
                to: email,
                // Subject of the message
                subject: 'Your OTP Number',

                // plaintext body

                // HTML body
                html: `${htmlToSend}`
            };



            console.log('Sending Mail');


            console.log('SMTP Configured');
            transport.sendMail(message, function (error) {
                if (error) {
                    console.log('Error occured');
                    console.log(error.message);
                    return;
                }
                console.log('Message sent successfully!');

                // if you don't want to use this transport object anymore, uncomment following line
                //transport.close(); // close the connection pool
            });
        }


        );

    }
}