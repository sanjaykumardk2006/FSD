const fs = require('fs');

try {
  const content = fs.readFileSync('eslint.json', 'utf16le');
  let data;
  try {
    data = JSON.parse(content);
  } catch (e) {
    const fallback = fs.readFileSync('eslint.json', 'utf8');
    data = JSON.parse(fallback);
  }

  const unused = [];
  data.forEach(file => {
    file.messages.forEach(msg => {
      if (msg.ruleId === 'no-unused-vars' || msg.ruleId === 'no-unused-vars-experimental' || msg.ruleId === 'react/jsx-no-undef') {
        unused.push({
          file: file.filePath,
          line: msg.line,
          message: msg.message,
          rule: msg.ruleId
        });
      }
    });
  });

  console.log(JSON.stringify(unused, null, 2));
} catch (error) {
  console.error("Failed to parse eslint.json:", error);
}
