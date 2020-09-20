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

promptUser()
    .then(function (answers) {
        const genMark = generateMarkdown(answers);
        console.log(answers);

        return writeFileAsync("README.md", genMark);
    }).then(function () {
        console.log("Successfully wrote to README.md")
    })
    .catch(function (err) {
        console.log(err);
    });


function generateMarkdown(answers) {
    return `
# ${answers.title} 

##Description
${answers.description}

## Table of Contents
${answers.tableoc}

## Installation Instructions
${answers.installation}

## Usage Information
${answers.usage}

## License
${answers.license}

## Contribution Guidelines
${answers.contributing}

## ${answers.tests}

## Questions?
### Email: ${answers.email}
### GitHub: [${answers.github}](github.com/shelkelly).`;
};

