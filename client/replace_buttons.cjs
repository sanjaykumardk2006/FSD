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
            if (content.includes('<button') && fullPath !== path.resolve(__dirname, 'src/components/AnimatedButton.jsx')) {
                // Calculate relative path to AnimatedButton
                const relativePath = path.relative(path.dirname(fullPath), path.resolve(__dirname, 'src/components/AnimatedButton'));
                const importPath = relativePath.replace(/\\/g, '/'); // ensure forward slashes
                
                // Add import if not present
                if (!content.includes('AnimatedButton')) {
                    // find last import
                    const importRegex = /^import.*?;?\s*$/gm;
                    let lastIndex = 0;
                    let match;
                    while ((match = importRegex.exec(content)) !== null) {
                        lastIndex = match.index + match[0].length;
                    }
                    if (lastIndex > 0) {
                        content = content.slice(0, lastIndex) + `\nimport AnimatedButton from '${importPath}';` + content.slice(lastIndex);
                    } else {
                        content = `import AnimatedButton from '${importPath}';\n` + content;
                    }
                }
                
                // Replace <button to <AnimatedButton and </button> to </AnimatedButton>
                content = content.replace(/<button/g, '<AnimatedButton');
                content = content.replace(/<\/button>/g, '</AnimatedButton>');
                
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
