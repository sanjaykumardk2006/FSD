const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            content = content.replace(/import AnimatedButton from '([^']+)';/g, (match, p1) => {
                if (!p1.startsWith('.')) {
                    changed = true;
                    return `import AnimatedButton from './${p1}';`;
                }
                return match;
            });
            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Fixed ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
