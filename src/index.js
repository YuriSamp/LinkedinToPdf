import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer
  .use(StealthPlugin)
  .launch({ headless: 'new' })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/in/yurisamp/', {
      waitUntil: 'domcontentloaded',
    });

    const nameTag = await page.$('.top-card-layout__title');
    const headlineTag = await page.$('.top-card-layout__headline');
    const aboutTag = await page.$('.core-section-container');
    const locationTag = await page.$('.top-card__subline-item');
    const experience = await page.$$('.experience-item');
    const education = await page.$$('.education__list-item');
    const language = await page.$$('.languages__list');
    const award = await page.$$('.awards__list');

    const name = await nameTag.evaluate((x) => x.textContent.trim());
    const headline = await headlineTag.evaluate((x) => x.textContent.trim());
    const about = await aboutTag.evaluate((x) =>
      x.textContent.replace(/\s/g, '')
    );

    const location = await locationTag.evaluate((x) => x.textContent.trim());

    const experiences = [];

    for (const experienceItem of experience) {
      const text = await experienceItem.evaluate((x) =>
        x.textContent.replace(/\s/g, '')
      );
      experiences.push(text);
    }

    const educations = [];
    if (education) {
      for (const educationitem of education) {
        const text = await educationitem.evaluate((x) =>
          x.textContent.replace(/\s/g, '')
        );
        educations.push(text);
      }
    }

    const languages = [];
    if (language) {
      for (const languageItem of language) {
        const text = await languageItem.evaluate((x) =>
          x.textContent.replace(/\s/g, '')
        );
        languages.push(text);
      }
    }

    const awards = [];
    if (award) {
      for (const awardItem of award) {
        const text = await awardItem.evaluate((x) =>
          x.textContent.replace(/\s/g, '')
        );
        awards.push(text);
      }
    }

    console.log({
      name,
      headline,
      location,
      about,
      experiences,
      educations,
      languages,
      awards,
    });

    await browser.close();
  });
