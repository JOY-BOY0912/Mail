const express = require('express');
const app = express();
const port = 300;
const sendmail = require('./controllers/sendmail');
const nodemailer = require('nodemailer');
const path = require('path')



app.use(express.static("style")) // For serving static files
app.use(express.urlencoded({ extended:true}))

 
//pug specific configuration    
app.set('view engine', 'ejs') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get("/",(req,res)=>{
  res.render("index.ejs")
  console.log("hello world")
})


app.post("/",(req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  console.log(name, email, message  )
  
  const transporter = nodemailer.createTransport({
    service:"gmail",                        
    auth: {
      user: "dhushyanth4646@gmail.com",
      pass: "mjcuuycwhhsysqle",
    },
  });

  var mailOptions =  transporter.sendMail({
    //from: email, // sender address
    //to: "dhushyanth4646@gmail.com", // list of receivers
    //cc: "dhushyanth4646@gmail.com", 
    //subject: "IMportant Email" + "from " + name, // Subject line
    //text: "the message is " + message , // plain text body
    //html: "<b>Hello world?</b>", // html body
    from: email, // sender address
    to: "dhushyanth4646@gmail.com", // list of receivers
    subject: "Hello it's me "+" "+ req.body.name +" "+ email +" "+  "this is my info "+" " + message , // Subject line
    text: "thanks for contacting us " + message, // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  transporter.sendMail(mailOptions , (err, info) => {
    if (err) {
      console.log(err);
    }else{
      console.log("Message sent: %s", info.messageId);
    }
  });
  res.send("mail sent!!")
})



app.get("/mail", sendmail)

app.listen(port,()=>{
  console.log(`listening on ${port}`);
});