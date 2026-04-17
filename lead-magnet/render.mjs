#!/usr/bin/env node
/**
 * Render the lead-magnet HTML to a print-perfect PDF.
 * Uses the Playwright chromium already cached at ~/.cache/ms-playwright.
 */
import { chromium } from "/home/dustin/.openclaw/workspace/node_modules/playwright/index.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "lead-magnet.html");
const outPath = path.join(
  __dirname,
  "..",
  "public",
  "downloads",
  "build-your-first-ai-agent.pdf",
);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("file://" + htmlPath, { waitUntil: "networkidle" });
// Extra settle for webfonts
await page.waitForTimeout(1500);

await page.pdf({
  path: outPath,
  width: "8.5in",
  height: "11in",
  printBackground: true,
  margin: { top: "0", right: "0", bottom: "0", left: "0" },
});

await browser.close();
console.log("PDF written to", outPath);
