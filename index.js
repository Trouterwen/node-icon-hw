const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');

const generateSVG = (text, textColor, shape, shapeColor) => {
  const svgTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
    <rect width="100%" height="100%" fill="${shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
  </svg>`;
  return svgTemplate;
};

const createLogoSVG = async () => {
  try {
    const userInput = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters for the logo:',
        validate: (input) => input.length <= 3,
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal number):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for the logo:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal number):',
      },
    ]);

    const { text, textColor, shape, shapeColor } = userInput;

    const svgContent = generateSVG(text, textColor, shape, shapeColor);
    await fs.writeFile('logo.svg', svgContent);

    console.log(chalk.green('Generated logo.svg'));
  } catch (error) {
    console.error(chalk.red('An error occurred:', error.message));
  }
};

createLogoSVG();
