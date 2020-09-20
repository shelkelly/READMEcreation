const inquirer = require("inquirer");
var fs = require("fs");
const util = require("util");

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
    type: "checkbox",
    name: "license",
    message: "License: ",
    choices: ["MIT", new inquirer.Separator(), "LGPL", new inquirer.Separator(), "MPL", new inquirer.Separator(), "AGPL", new inquirer.Separator, "Apache", new inquirer.Separator, "GPL", new inquirer.Separator(), "Unlicense"]
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
    name: "github",
    message: "GitHub Username: "
},
{
    type: "input",
    name: "email",
    message: "Email: "
}];

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt(questions);
};

function generateMarkdown(answers) {
    return ` # ${questions.title} 

    ## Description
    ${questions.description}

    ## Table of Contents
    # ${questions.tableoc}

    ## Installation Instructions
    How to execute the application?
    ${questions.installation}

    ## Usage Information
    ${questions.usage}

    ## License
    ${questions.license}

    ## Contribution Guidelines
    ${questions.contributing}

    ## ${questions.tests}

    ## Questions?
    ### Email: ### ${questions.email}
    ### GitHub: [${questions.github}](github.com/shelkelly).`;
}

promptUser()
    .then(function (answers) {
        const genMark = generateMarkdown(answers);

        return writeFileAsync("README.md", genMark);
    }).then(function () {
        console.log("Successfully wrote to README.md")
    })
    .catch(function (err) {
        console.log(err);
    });
