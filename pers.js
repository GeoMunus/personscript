// personscript.js - a JavaScript interpreter for the personscript language

const fs = require('fs');

// Define the personscript keywords and their associated actions
const keywords = {
  when: executeWhen,
  as: assignVariable,
};

// Define a dictionary to store variables
const variables = {};

// Define a function to execute personscript code
function execute(code) {
  // Split the code into lines
  const lines = code.split('\n');
  
  // Loop through the lines and execute each one
  for (const line of lines) {
    // Ignore empty lines
    if (line.trim() === '') {
      continue;
    }
    
    // Split the line into tokens
    const tokens = line.trim().split(' ');
    
    // Find the keyword for the line and execute its associated action
    const keyword = tokens[0];
    const action = keywords[keyword];
    if (action) {
      action(tokens.slice(1));
    }
  }
}

// Define a function to execute code when a condition is met
function executeWhen(args) {
  const condition = args.join(' ');
  const code = getNextBlock();
  if (eval(condition)) {
    execute(code);
  }
}

// Define a function to assign a value to a variable
function assignVariable(args) {
  const name = args[0];
  const value = args.slice(1).join(' ');
  variables[name] = value;
}

// Define a function to get the next block of code
function getNextBlock() {
  let block = '';
  let line = '';
  while ((line = readline()) !== null) {
    if (line.trim() === '') {
      continue;
    }
    if (line.trim() === 'end') {
      break;
    }
    block += line + '\n';
  }
  return block;
}

// Define a function to read input from stdin
function readline() {
  const buffer = Buffer.alloc(1024);
  const bytesRead = fs.readSync(process.stdin.fd, buffer, 0, 1024);
  if (bytesRead === 0) {
    return null;
  }
  return buffer.toString().substring(0, bytesRead - 1);
}

// Read the personscript code from stdin and execute it
const code = readline();
execute(code);
