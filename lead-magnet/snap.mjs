#!/usr/bin/env node
import { chromium } from "/home/dustin/.openclaw/workspace/node_modules/playwright/index.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "lead-magnet.html");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 816, height: 1056 }, // 8.5x11 at 96dpi
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const pages = await page.$$(".page");
console.log("Found", pages.length, "pages");

// Snap pages 2 (TOC), 11 (finale) for verification
const targets = [1, 10];
for (const idx of targets) {
  if (pages[idx]) {
    const outPath = path.join(__dirname, `page-${idx + 1}.png`);
    await pages[idx].screenshot({ path: outPath });
    console.log("Snapped page", idx + 1, "→", outPath);
  }
}

await browser.close();
