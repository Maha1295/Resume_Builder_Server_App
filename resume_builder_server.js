const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.post("/api/save-data", (req, res) => {
  const data = req.body;
  console.log(data);
  console.log("--------------------------------");

  const listOfLanguages = data.languagesKnown.split(" ");
  const languageElement = listOfLanguages.map((lang) => {
    return `<li>
    <span class="text">${lang}</span>
    <span class="percent">
      <div style="width: 98%"></div>
    </span>
  </li>`;
  }).join("");//join() method with an empty string as the separator to eliminate , in between

  const listOfInterests = data.personalIntersts.split(" ");
  const personalInterestElement = listOfInterests.map((interest) => {
    return (`<li class="text-interest">${interest}</li>`);
  }).join("");

  const listOfTechSkills = data.technicalSkills.map((skill) => {
    return (`<div class="tech-skill-card">${skill}</div>`)
  }).join("");

  // Define the HTML template as a string
  const template = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.firstName} | Résumé</title>
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;900&display=swap");
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }

    body {
      background: lightblue;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .title {
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .container {
      position: relative;
      width: 100%;
      max-width: 1000px;
      min-width: 100px;
      min-height: 1000px;
      margin: 50px;
      background: #fff;
      display: grid;
      grid-template-columns: 1.25fr 2fr;
      box-shadow: 0 35px 55px rgba(0, 0, 0, 0.1);
    }

    .container .left-side {
      position: relative;
      background: #003147;
      padding: 40px;
    }

    .profileText {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .profileText .imgBx {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
    }

    .profileText .imgBx img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profileText h2 {
      color: #fff;
      font-size: 1.5em;
      margin-top: 20px;
      text-align: center;
      font-weight: 600;
      line-height: 1.4em;
    }

    .profileText h2 span {
      font-size: 0.8em;
      font-weight: 300;
    }

    .contact-info {
      padding-top: 40px;
    }

    .contact-info ul {
      position: relative;
    }

    a {
      text-decoration: none;
      color: #fff;
    }

    .contact-info ul li {
      position: relative;
      list-style: none;
      margin: 10px 0;
      cursor: pointer;
    }

    .contact-info ul li span.text {
      color: #fff;
      font-weight: 500;
      font-size: large;
    }

    .contact-info .language {
      padding-top: 0px !important;
    }

    .contact-info.language .percent {
      position: relative;
      width: 100%;
      height: 6px;
      background: #081921;
      display: block;
      margin-top: 5px;
    }

    .contact-info.language .percent div {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: #03a9f4;
    }

    .interest{
      margin-top: 30px;
    }

    .interest ul li {
      list-style: none;
      color: white;
      font-weight: 500;
      margin: 8px 0;
    }

    .container .right-side {
      position: relative;
      background: #fff;
      padding: 40px;
    }

    .about {
      margin-bottom: 40px;
    }

    .title2 {
      color: #003147;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .about p {
      color: #333;
      font-weight: 500;
    }

    .edu-card {
      background-color: #003147;
      color: white;
      padding: 2px 3px;
      margin-bottom : 5px;
      border-radius: 10px;
    }

    .edu-class{
      font-weight: 600;
    }

    .edu-details{
      margin-left : 10px;
    }

    .tech-skill-container{
      margin-top: 20px;
    }

    .tech-skill-card{
      color: white;
      background-color: #406474;
      font-size: larger;
      padding: 5px 30px;
      font-weight: bolder;
      margin-left: 2rem;
      margin-bottom: 1rem;
      width: 80%;
      border-radius: 10px;
    }

    @media (max-width: 1000px) {
      .container {
        margin: 10px;
        grid-template-columns: repeat(1, 1fr);
      }
    }
  </style>
  </head>
  <body>
    <div class="container">
      <div class="left-side">
        <div class="profileText">
          <div class="imgBx">
            <img src=${data.profilePic} alt="My Pic"/>
          </div>
          <h2>
          ${data.firstName} ${data.lastName} <br />
            <span>Wishing to be a Fullstack Developer</span>
          </h2>
        </div>

        <div class="contact-info">
          <h3 class="title">Contact Info</h3>
          <ul>
            <li>
              <span class="text">Phone No. :  ${data.phoneNumber}</span>
            </li>
            <li>
              <span class="text">
                <a href="mailto:${data.emailAddress}">Mail Me :  <span>${data.emailAddress}</span></a>
              </span>
            </li>
          </ul>
        </div>

        <div class="contact-info language">
          <h3 class="title">Languages</h3>
          <ul>
            ${languageElement}
          </ul>
        </div>

        <div class="interest">
          <h2 class="title">Interests</h2>
          <ul>
            ${personalInterestElement}
          </ul>
        </div>
      </div>

      <div class="right-side">
        <div class="about">
          <h2 class="title2">Profile</h2>
          <div>
            <p align="justify">
              ${data.briefIntroduction}
            </p>
          </div>
        </div>

      <div class="tech-skill-container">
        <h2 class="title2">Technical Skills</h2>
        ${listOfTechSkills}
      </div>
        
      <div class="education-container">
        <h2 class="title2">Education</h2>
        <div class="edu-card">
          <p class="edu-class">Secondary School Leaving Certificate (S.S.L.C / 10th)</p>
          <div class="edu-details">
          <p>Year of Passing : ${data.education_10th.passedOutYear}</p>
          <p>Name of Instituion : ${data.education_10th.institution}</p>
          <p>Marks Scored in % : ${data.education_10th.marks}</p>
          </div>
        </div>

        <div class="edu-card">
          <p class="edu-class">Pre University College (P.U.C / 12th)</p>
          <div class="edu-details">
          <p>Year of Passing : ${data.education_12th.passedOutYear}</p>
          <p>Name of Instituion : ${data.education_12th.institution}</p>
          <p>Marks Scored in % :  ${data.education_10th.marks}</p>
          </div>
        </div>

        ${data.education_grad.passedOutYear &&  
        `<div class="edu-card">
          <p class="edu-class">Graduation</p>
          <div class="edu-details">
          <p>Course And Branch : ${data.education_grad.course}</p>
          <p>Year of Passing : ${data.education_grad.passedOutYear}</p>
          <p>Name of Instituion : ${data.education_grad.institution}</p>
          <p>Marks Scored in % : ${data.education_grad.marks}</p>
          </div>
        </div>`}

        ${data.education_masters.passedOutYear &&  
          `<div class="edu-card">
            <p class="edu-class">Graduation</p>
            <div class="edu-details">
            <p>Course And Branch : ${data.education_masters.course}</p>
            <p>Year of Passing : ${data.education_masters.passedOutYear}</p>
            <p>Name of Instituion : ${data.education_masters.institution}</p>
            <p>Marks Scored in % : ${data.education_masters.marks}</p>
            </div>
          </div>`}
      </div>
    </div>
    </div>
  </body>
</html>  
`;

  // Write the template to a file
  fs.writeFile(`${data.firstName}.html`, template, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing data to file");
    } else {
      // console.log(data);
      console.log("Generated File Sucessfully....");
      res.send("Data saved successfully");
    }
  });

  //   console.log(template);
  //   fs.writeFile("data.txt", JSON.stringify(data), (err) => {
  //     if (err) {
  //       console.error(err);
  //       res.status(500).send("Error writing data to file");
  //     } else {
  //       res.send("Data saved successfully");
  //     }
  //   });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
