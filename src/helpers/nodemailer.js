// 2. email bodyy
// 3. send method

const accountVerificationEmail = (obj) => {
  const { email } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'hettie.donnelly78@ethereal.email',
        pass: '5DHgKeHqcdF6NxNpqC'
    }
});

const info = await transporter.sendMail({
  from:` "Fred Foo 👻" <${process.env.SMTP_USER}>', // sender address
  to: email,  // list of receivers
  subject: "Account Activation requred", // Subject line
  text: "Hello please click in the link bleow to activate your account", // plain text body
  html: "<b>Hello world?</b>", // html body
});
})

})

<p>
Hello ${fName}
</p>
<p> please follow the link below to activate your account</p>
<br/>
<br/>

<p>
<a href="${link}" />
</p>
<p>
 Regards, <br/>
 Est store, <br>
 </p>