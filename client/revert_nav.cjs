const fs = require('fs');
const path = require('path');

const filesToRevert = [
    path.join(__dirname, 'src', 'components', 'Header.jsx'),
    path.join(__dirname, 'src', 'components', 'DashboardLayout.jsx')
];

for (const file of filesToRevert) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/<AnimatedButton/g, '<button');
        content = content.replace(/<\/AnimatedButton>/g, '</button>');
        // Remove the import statement
        content = content.replace(/import AnimatedButton from ['"][^'"]+['"];?\n?/g, '');
        fs.writeFileSync(file, content, 'utf8');
        console.log('Reverted ' + file);
    }
}
