const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/31ad91484d";

  const options = {
    method: "POST",
    auth: "Jamie:027610e85acb5dbc5b5aae7a777595c5-us7"
  };
 
  const request = https.request(url, options, function(response) {
    
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("date", function (data) {
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("server is running");
});

// Api Key
// 027610e85acb5dbc5b5aae7a777595c5-us7

//unique id for audience
//31ad91484d
