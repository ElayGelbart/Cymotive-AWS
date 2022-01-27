import puppeteer from "puppeteer";
let browser: puppeteer.Browser;
let page: puppeteer.Page;
beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/");
}, 60000);
describe("E2E Tests", () => {
  it("should have page title", async () => {
    expect(await page.title()).toBe("Cymotive Statistic");
  });

  it("should render elements", async () => {
    const StatsDiv = await page.waitForSelector("#statsDiv");
    expect(StatsDiv).toBeDefined();
    const pageHeader = await page.waitForSelector("#pageHeader");
    expect(pageHeader).toBeDefined();
    const wavePic = await page.waitForSelector("#wave");
    expect(wavePic).toBeDefined();
    const carVideo = await page.waitForSelector("#carVideo");
    expect(carVideo).toBeDefined();
    const wordTitle = await page.evaluate(() => {
      return document.querySelector("#headline")?.textContent;
    });
    expect(wordTitle).toBe("Get Statistics About The Futureof Mobility");
  });

  it("should get Stats on Click", async () => {
    const [getReportsSpan] = await page.$x(
      "//p[contains(., 'Number Of Reports')]"
    );
    await getReportsSpan.click();

    const [_reportsButton, vehiclesButton, anomaliesButton] = await page.$x(
      "//p[@class='button']"
    );
    await vehiclesButton.click({ delay: 1000 });
    await anomaliesButton.click({ delay: 1000 });
    await page.waitForTimeout(1500);
    expect(
      await vehiclesButton.evaluate((el: { textContent: any }) => {
        return Number(el.textContent);
      })
    ).toBeGreaterThan(0);
    expect(
      await anomaliesButton.evaluate((el: { textContent: any }) => {
        return Number(el.textContent);
      })
    ).toBeGreaterThan(0);
  });
});
afterAll(async () => {
  await browser.close();
});
