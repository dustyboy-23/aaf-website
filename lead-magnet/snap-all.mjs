#!/usr/bin/env node
import { chromium } from "/home/dustin/.openclaw/workspace/node_modules/playwright/index.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "lead-magnet.html");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 816, height: 1056 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const pages = await page.$$(".page");
console.log("Found", pages.length, "pages");

for (let i = 0; i < pages.length; i++) {
  const outPath = path.join(__dirname, `preview-${String(i + 1).padStart(2, "0")}.png`);
  await pages[i].screenshot({ path: outPath });
  console.log("→", outPath);
}

await browser.close();
