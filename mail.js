
var mail = {
    init: function(config) {
        this.transport = require('nodemailer').createTransport("SMTP",{
            service: "SendGrid",
            auth: {
                user: config.user,
                pass: config.key
            }
        });

        this.send = this.transport.sendMail.bind(this.transport);
    },
    send: function(o, cb) {
        cb(false);
    }
};

module.exports = mail;