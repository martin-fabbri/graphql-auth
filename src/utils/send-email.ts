import nodeMailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(receiverEmail: string, url: string) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodeMailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"ePuppy support👻" <support@epuppy.com>',
        to: receiverEmail,
        subject: 'Account confirmation', // Subject line
        text: 'Confirm your account', // plain text body
        html: `<a href="${url}">Confirm your account</a>`, // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
