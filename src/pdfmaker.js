import PDFDocument from 'pdfkit';

const fs = require('fs');

const outputFilename = 'yuri_sampaio_cv.pdf';

// Create a new PDF document
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(outputFilename));

// Personal Information
const personalInfo = {
  name: 'Yuri Sampaio',
  headline:
    'Frontend Developer | TypeScript | Javascript | React | Next | Node | HTML | CSS | Tailwind',
  location: 'Rio de Janeiro, Brasil',
  about:
    'Sou um desenvolvedor front-end com experiência em React / Next, javascript e Typescript, apaixonado por open-source e compartilho o meu conhecimento através de artigos sobre tecnologia no meu Dev.to.',
};

doc.fontSize(18).text('Curriculum Vitae', { align: 'center' });
doc.moveDown();
doc.fontSize(14).text('Personal Information', { underline: true });
doc.fontSize(12).text(`Name: ${personalInfo.name}`);
doc.fontSize(12).text(`Headline: ${personalInfo.headline}`);
doc.fontSize(12).text(`Location: ${personalInfo.location}`);
doc.moveDown();

// About
doc.fontSize(14).text('About', { underline: true });
doc.fontSize(12).text(personalInfo.about);
doc.moveDown();

// Experiences
const experiences = [
  {
    title: 'Designer',
    company: 'Sua Arte Comunicação Visual',
    duration: 'Jun. 2022 - Dez. 2022 (7 meses)',
    location: 'Rio de Janeiro, Rio de Janeiro, Brazil',
    description:
      'Trabalhei criando arte para banners, adesivos, lonas e outros trabalhos relacionados à comunicação visual, utilizando Photoshop.',
  },
  // Add more experience entries here...
];

doc.fontSize(14).text('Experiences', { underline: true });
experiences.forEach((experience) => {
  doc.fontSize(12).text(`${experience.title} at ${experience.company}`);
  doc.fontSize(10).text(`Duration: ${experience.duration}`);
  doc.fontSize(10).text(`Location: ${experience.location}`);
  doc.fontSize(10).text(experience.description);
  doc.moveDown();
});

// Educations
const educations = [
  {
    institution: 'Descomplica',
    degree: "Bachelor's degree",
    field: 'Sistemas de Informação',
    duration: '2023 - 2026',
  },
  {
    institution: 'Alura',
    degree: 'Certificate',
    field: 'Various technology topics',
    duration: '2022 - 2023',
  },
  {
    institution: 'FAETEC',
    degree: 'High School',
    field: 'Edificações',
    duration: '2018 - 2020',
  },
];

doc.fontSize(14).text('Education', { underline: true });
educations.forEach((education) => {
  doc.fontSize(12).text(`${education.degree} at ${education.institution}`);
  doc.fontSize(10).text(`Field: ${education.field}`);
  doc.fontSize(10).text(`Duration: ${education.duration}`);
  doc.moveDown();
});

// Finalize and close the PDF document
doc.end();
