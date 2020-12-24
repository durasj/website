import puppeteer from "puppeteer";
import { readFile } from "fs";
import { promisify } from "util";
import ejs from "ejs";
import YAML from "yaml";

const readFileAsync = promisify(readFile);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const contentYaml = await readFileAsync("./cv/content.yaml", "utf8");
  const content = YAML.parse(contentYaml);
  const photo = await readFileAsync("./cv/photo.jpg", { encoding: "base64" });

  const template = await readFileAsync("./cv/template.html", {
    encoding: "utf-8",
  });

  const html = ejs.render(template, {
    ...content,
    photo: `data:image/jpeg;base64,${photo}`,
  });

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.pdf({ path: "./cv.pdf", format: "A4" });

  await browser.close();
})();
