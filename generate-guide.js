const PDFDocument = require('pdfkit');
const fs = require('fs');
const { execSync } = require('child_process');

try {
  console.log('Installing pdfkit...');
  execSync('npm install pdfkit', { stdio: 'inherit' });
} catch (e) {
  console.error('Failed to install pdfkit');
  process.exit(1);
}

const doc = new PDFDocument({ margin: 50 });
doc.pipe(fs.createWriteStream('Project-Guide.pdf'));

// Title
doc.fontSize(24).font('Helvetica-Bold').text('Next.js Chakra Auth - Project Guide', { align: 'center' });
doc.moveDown(2);

// Section 1: Overview
doc.fontSize(16).font('Helvetica-Bold').text('1. Project Overview');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica').text('This project is a modern Next.js (App Router) web application featuring a secure Login page and a multi-step Registration flow. It uses Chakra UI for premium styling and React Hook Form with Zod for robust validation.');
doc.moveDown(1.5);

// Section 2: Folder Structure
doc.fontSize(16).font('Helvetica-Bold').text('2. Folder Structure');
doc.moveDown(0.5);
const structure = `
app/
  page.tsx                  (Dashboard / Home)
  auth/
    login/page.jsx          (Login Screen)
    signup/page.jsx         (Multi-step Registration Flow)

components/
  layout/AuthLayout.jsx     (Split-screen layout with carousel)
  login/LoginForm.jsx       (Login logic)
  register/                 (Registration Steps)
    RegisterStart.jsx
    Registerstepone.jsx
    Registersteptwo.jsx
    Registerpassword.jsx

Validation/
  registerShema.js          (Zod rules)
`;
doc.font('Courier').fontSize(10).text(structure);
doc.moveDown(1.5);

// Section 3: How the Login Works
doc.fontSize(16).font('Helvetica-Bold').text('3. How Login Works');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica').text('The login page (app/auth/login) uses AuthLayout to display a slick carousel of 3 images on the right. On the left, LoginForm collects the email and password. If the user enters admin@example.com and Password123, it redirects them to the Home Page (app/page.tsx).');
doc.moveDown(1.5);

// Section 4: How Registration Works
doc.fontSize(16).font('Helvetica-Bold').text('4. How Registration Works');
doc.moveDown(0.5);
doc.fontSize(12).font('Helvetica').text('The signup process (app/auth/signup) is a Single Page Application that uses URL parameters (?step=START, ?step=IDENTITY, etc.) to navigate. \n\nWe wrap all steps in a <FormProvider> so data is remembered across steps. When the user clicks "Continue", we call trigger() from react-hook-form to ensure the Zod schema rules (like valid email, 8-character password) are met before advancing to the next step.');

doc.end();
console.log('Successfully generated Project-Guide.pdf');
