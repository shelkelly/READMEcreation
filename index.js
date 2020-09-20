const inquirer = require("inquirer");
var fs = require("fs");
const util = require("util");
var badge = "";
var link = "";

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
    if (answers.license == "MIT") {
        badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
        link = "https://opensource.org/licenses/MIT";
    } else if (answers.license == "LGPL") {
        badge = "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
        link = "https://www.gnu.org/licenses/lgpl-3.0";
    } else if (answers.license == "MPL") {
        badge = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
        link = "https://opensource.org/licenses/MPL-2.0";
    } else if (answers.license == "AGPL") {
        badge = "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
        link = "https://www.gnu.org/licenses/agpl-3.0";
    } else if (answers.license == "Apache") {
        badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
        link = "https://opensource.org/licenses/Apache-2.0";
    } else if (answers.license == "GPL") {
        badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
        link = "https://www.gnu.org/licenses/gpl-3.0";
    } else if (answers.license == "Unlicense") {
        badge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
        link = "http://unlicense.org/";
    }
    return `
># ${answers.title}
${badge}

## Description
>${answers.description}

## Table of Contents
>${answers.tableoc}

## Installation Instructions
>${answers.installation}

## Usage Information
>${answers.usage}

## License
>[${answers.license}](${link})

## Contribution Guidelines
>${answers.contributing}

>## ${answers.tests}

## Questions?
### Email: ${answers.email}
### GitHub: [${answers.github}](github.com/shelkelly)`;
};

