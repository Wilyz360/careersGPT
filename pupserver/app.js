import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const router = express.Router();

function extractNumber(str) {
  const regex = /\d+/g; // Regular expression to match digits
  const numbers = str.match(regex); // Extract all digit sequences

  if (numbers) {
    const numberWithoutCommas = numbers.join(''); // Remove commas by joining the digit sequences
    return parseInt(numberWithoutCommas, 10); // Convert the result to an integer
  }

  return null; // Return null if no digits were found
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  })
);

app.get('/', (req, res) => {
  res.send('Hello from the GET route!');
});


// POST route
app.get('/post', (req, res) => {
  // const requestBody = req.body;
  puppeteer
  .use(StealthPlugin())
  .launch({ headless: false })
  .then(async (browser) => {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 1320, height: 944 });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    );
    const cssSearch = 'aria-label="Search"';

    await page.goto('https://www.linkedin.com/');
    // const cookies = await page.cookies();
    // const cookieJson = JSON.stringify(cookies);

    // // And save this data to a JSON file

    // fs.writeFileSync('httpbin-cookies.json', cookieJson);w
    // const deserializedCookies = JSON.parse(cookies);
    // await page.setCookie(...deserializedCookies);

    const email = await page.$x(
      '/html/body/main/section[1]/div/div/form[1]/div[1]/div[1]/div/div/input'
    );
    await email[0].type('wojdafilip@gmail.com');
    const password = await page.$x(
      '/html/body/main/section[1]/div/div/form[1]/div[1]/div[2]/div/div/input'
    );
    await password[0].type('f3rQshcU!!!');
    await page.keyboard.press('Enter');

    const searchInput = await page.waitForSelector(
      'input[aria-label="Search"]'
    );
    await searchInput.type('software engineer intern remote');

    await page.keyboard.press('Enter');
    const firstResultXPath =
      '/html/body/div[5]/div[3]/div[2]/div/div[1]/main/div/div/div[1]/div/ul/li[1]/div/div/div[2]/div[1]/div[1]/div/span/span/a';
    const easyApplyFilterXPath =
      '/html/body/div[4]/div[3]/div[4]/section/div/section/div/div/div/ul/li[8]/div/button';
    const jobTitleXPath =
      '/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[2]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/a/h2';

    // await page.waitForXPath(firstResultXPath);
    const firstResult = await page.waitForSelector(
      'div[class="entity-result"]'
    );
    await firstResult.click();
    const easyApplyFilter = await page.waitForSelector(
      'button[aria-label="Easy Apply filter."]'
    );

    await easyApplyFilter.click();

    const scrollable_section = '.scaffold-layout__list-container';

    await page.waitForSelector(scrollable_section);

    await page.evaluate((selector) => {
      const scrollableSection = document.querySelector(selector);

      scrollableSection.scrollTop = scrollableSection.offsetHeight;
    }, scrollable_section);

    // const numberOfJobsXPath =
    //   '/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[1]/header/div[1]/small';
    // await page.waitForXPath(numberOfJobsXPath);
    // const numberOfJobsEl = await page.$x(numberOfJobsXPath);
    // const numberOfJobsText = await page.evaluate(
    //   (el) => el.textContent,
    //   numberOfJobsEl[0]
    // );
    // const numberOfJobs = extractNumber(numberOfJobsText);
    // console.log('number of jobs available: ', numberOfJobsText);
    const applyButtonXPath =
      '/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[2]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div[3]/div/div/div/button';

    const applyTextSpanXPath =
      '/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[2]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div[3]/div/div/div/button/span';

    const nextButtonFirstPageApplyXPath =
      '/html/body/div[3]/div/div/div[2]/div/div[2]/form/footer/div[2]/button';
    const nextButtonSecondPageApplyXPath =
      '/html/body/div[3]/div/div/div[2]/div/div[2]/form/footer/div[2]/button[2]';
    const submitApplicationButtonXPath =
      '/html/body/div[3]/div/div/div[2]/div/div/form/footer/div[3]/button';
    const leaveJobXPath = '/html/body/div[3]/div/div/button';
    const confirmLeaveJobXPath =
      '/html/body/div[3]/div[2]/div/div[3]/button[1]';

    let numOfIterations = 10;
    // if (numberOfJobs > 10) {
    //   numOfIterations = 10;
    // }
    for (let i = 1; i < numOfIterations; i++) {
      const oneJobListXPath = `/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[1]/div/ul/li[${i}]`;
      const oneJobList = await page.waitForXPath(oneJobListXPath);
      await oneJobList.click();
      const jobTitle = await page.$x(jobTitleXPath);
      const jobTitleText = await page.evaluate(
        (el) => el.textContent,
        jobTitle[0]
      );
      console.log(jobTitleText);
      if (jobTitleText.toLowerCase().includes('unpaid')) {
        continue;
      }
      const applyButtonSelector = await page.waitForSelector(
        'button[class="jobs-apply-button artdeco-button artdeco-button--3 artdeco-button--primary ember-view"]'
        { visible: true }
      );
      if (!applyButtonSelector) {
        const applyButtonXPathSelector = await page.waitForXPath(
          '/html/body/div[4]/div[3]/div[4]/div/div/main/div/div[2]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div[3]/div/div/div/button',
          { visible: true }
        );
        await applyButtonXPathSelector.click();
      } else {
        await applyButtonSelector.click();
      }

      const submitApplicationButton = await page.waitForXPath(
        submitApplicationButtonXPath,
        { timeout: 6000 }
      );
      if (submitApplicationButton) {
        await submitApplicationButton.click();
      } else {
        const leaveApplicationButton = await page.waitForXPath(
          leaveJobXPath
        );
        await leaveApplicationButton[0].click();
        await page.waitForXPath(confirmLeaveJobXPath);
        const confirmLeaveJobButton = await page.waitForXPath(
          confirmLeaveJobXPath,
          { visible: true }
        );
        if (confirmLeaveJobButton) {
          await confirmLeaveJobButton[0].click();
          continue;
        }
      }
    }

    await browser.close();
  });


  res.json({ completed: true });
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});




