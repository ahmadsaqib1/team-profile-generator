const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// Function to prompt for manager information
function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "Enter the manager's name:",
    },
    {
      type: "input",
      name: "managerId",
      message: "Enter the manager's ID:",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "Enter the manager's email:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
    },
  ]);
}
// Function to prompt for engineer information
function promptEngineer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "Enter the engineer's name:",
    },
    {
      type: "input",
      name: "engineerId",
      message: "Enter the engineer's ID:",
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "Enter the engineer's email:",
    },
    {
      type: "input",
      name: "githubUsername",
      message: "Enter the engineer's GitHub username:",
    },
  ]);
}

// Function to prompt for intern information
function promptIntern() {
  return inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "Enter the intern's name:",
    },
    {
      type: "input",
      name: "internId",
      message: "Enter the intern's ID:",
    },
    {
      type: "input",
      name: "internEmail",
      message: "Enter the intern's email:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
    },
  ]);
}

// Function to prompt for menu options
function promptMenu() {
  return inquirer.prompt({
    type: "list",
    name: "menuChoice",
    message: "What would you like to do?",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  });
}

// Function to build the team
async function buildTeam() {
  const teamMembers = [];

  // Prompt for manager information
  const managerAnswers = await promptManager();
  const manager = new Manager(
    managerAnswers.managerName,
    managerAnswers.managerId,
    managerAnswers.managerEmail,
    managerAnswers.officeNumber
  );
  teamMembers.push(manager);

  let menuChoice = "";

  // Continue prompting until the user chooses to finish building the team
  while (menuChoice !== "Finish building the team") {
    // Prompt for menu options
    const menuAnswers = await promptMenu();
    menuChoice = menuAnswers.menuChoice;

    // Handle user choice
    switch (menuChoice) {
      case "Add an engineer":
        // Prompt for engineer information
        const engineerAnswers = await promptEngineer();
        const engineer = new Engineer(
          engineerAnswers.engineerName,
          engineerAnswers.engineerId,
          engineerAnswers.engineerEmail,
          engineerAnswers.githubUsername
        );
        teamMembers.push(engineer);
        break;

      case "Add an intern":
        // Prompt for intern information
        const internAnswers = await promptIntern();
        const intern = new Intern(
          internAnswers.internName,
          internAnswers.internId,
          internAnswers.internEmail,
          internAnswers.school
        );
        teamMembers.push(intern);
        break;

      case "Finish building the team":
        // Render the HTML using the team members and save to file
        const html = render(teamMembers);
        fs.writeFileSync(outputPath, html);
        console.log("Team HTML generated and saved.");
        break;

      default:
        console.log("Invalid choice. Please try again.");
        break;
    }
  }
}

// Start building the team
buildTeam();
