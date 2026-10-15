#!/usr/bin/env node
// Full-page screenshot helper for visual-parity checks.
//
// Drives headless Chromium over the DevTools Protocol using Node's built-in
// fetch + WebSocket (Node 22+). No npm dependencies.
//
// Usage:
//   node scripts/screenshot.mjs <url> <out.png> [width] [viewportHeight]
//
// Example (compare the local build against the main/Gatsby reference):
//   python3 -m http.server 8099 --directory _site &
//   node scripts/screenshot.mjs http://localhost:8099/ /tmp/eleventy.png 1440 900
//   node scripts/screenshot.mjs https://www.calebburton.com/ /tmp/main.png 1440 900
//   compare -metric AE /tmp/main.png /tmp/eleventy.png /tmp/diff.png
//
// Notes:
//   - Scrolls through the page first so IntersectionObserver animations fire.
//   - Emulates prefers-reduced-motion: reduce so transitions settle quickly.
//   - Captures the full scrollable page via Page.captureScreenshot +
//     captureBeyondViewport, not just the viewport.
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [, , url, out, wArg, hArg] = process.argv;
if (!url || !out) {
  console.error(
    "usage: node scripts/screenshot.mjs <url> <out.png> [width] [viewportHeight]",
  );
  process.exit(2);
}
const width = Number(wArg || 1440);
const viewportH = Number(hArg || 900);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(
  "chromium",
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=9222",
    `--window-size=${width},${viewportH}`,
    url,
  ],
  { stdio: "ignore" },
);

async function getPageWs() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch("http://127.0.0.1:9222/json")).json();
      const page = list.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // devtools not up yet
    }
    await sleep(200);
  }
  throw new Error("no page target (is chromium installed and on PATH?)");
}

const ws = new WebSocket(await getPageWs());
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const mid = ++id;
    pending.set(mid, (m) =>
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result),
    );
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: viewportH,
    deviceScaleFactor: 1,
    mobile: width < 700,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await sleep(2000);

  const height = await send("Runtime.evaluate", {
    expression: "document.body.scrollHeight",
    returnByValue: true,
  }).then((r) => r.result.value);
  for (let y = 0; y <= height; y += Math.floor(viewportH * 0.8)) {
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
    await sleep(120);
  }
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
  await sleep(600);

  const metrics = await send("Page.getLayoutMetrics");
  const size = metrics.cssContentSize || metrics.contentSize;
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 },
  });
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(`wrote ${out} (${size.width}x${size.height})`);
} finally {
  ws.close();
  chrome.kill();
}
