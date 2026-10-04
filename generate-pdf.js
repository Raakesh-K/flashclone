const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const filesToInclude = [
  'app/page.tsx',
  'app/auth/login/page.jsx',
  'app/auth/signup/page.jsx',
  'components/layout/AuthLayout.jsx',
  'components/login/LoginForm.jsx',
  'components/register/RegisterStart.jsx',
  'components/register/Registerstepone.jsx',
  'components/register/Registersteptwo.jsx',
  'components/register/Registerpassword.jsx',
  'Validation/registerShema.js'
];

let markdownContent = '# Codebase Overview\n\n';

for (const file of filesToInclude) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(file).replace('.', '');
    const content = fs.readFileSync(filePath, 'utf-8');
    markdownContent += `## ${file}\n\n\`\`\`${ext}\n${content}\n\`\`\`\n\n`;
  }
}

fs.writeFileSync('codebase.md', markdownContent);
console.log('Created codebase.md');

try {
  console.log('Installing md-to-pdf...');
  execSync('npm install -D md-to-pdf', { stdio: 'inherit' });
  
  console.log('Generating PDF...');
  execSync('npx md-to-pdf codebase.md', { stdio: 'inherit' });
  console.log('Successfully generated codebase.pdf');
} catch (error) {
  console.error('Error generating PDF:', error.message);
}
