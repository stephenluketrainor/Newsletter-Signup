// jshint: esversion 6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.firstName;
  const secondName = req.body.secondName;
  const userEmail = req.body.userEmail;


  const data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: secondName,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/727c1053e3"

  const options = {
    method: "POST",
    auth: "stephen1:ff6448c291df5ea37c2b2888da85639c-us8"
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
     //not required
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })

  });

  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on heroku");
});

// API KEY
// ff6448c291df5ea37c2b2888da85639c-us8

// Audience ID
// 727c1053e3
