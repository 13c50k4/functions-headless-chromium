const puppeteer = require("puppeteer");

module.exports = async function (context, req) {
    const url = req.query.url || "https://google.com/";
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
    });
    await page.goto(url);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
};
