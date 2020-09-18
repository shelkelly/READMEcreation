// array of questions for user
const questions = [{
    type: "input:",
    name: "title",
    message: "Title: "
},
{
    type: "input",
    name: "description",
    message: "Description: "
},
{
    type: "input",
    name: "tableoc",
    message: "Table of Contents: "
},
{
    type: "input",
    name: "installation",
    message: "Installation: "
},
{
    type: "input",
    name: "usage",
    message: "Usage: "
},
{
    type: "input",
    name: "license",
    message: "License: "
},
{
    type: "input",
    name: "contributing",
    message: "Contributing: "
},
{
    type: "input",
    name: "tests",
    message: "Tests: "
},
{
    type: "input",
    name: "questions",
    message: "Questions: "
}];

const inquirer = require("inquirer");
var fs = require("fs");
const genmarkjs= require("./utils/generateMarkdown");



function promptUser() {
    return inquirer.prompt(questions);
}


// function to write README file
fs.writeFile("README.md", generateMarkdown(), function(err) {

    if (err) {
      return console.log(err);
    }
  
  });



// function to initialize program
function init() {

}

// function call to initialize program
init();
promptUser();
