/* ==========================================================================
   砚台 · 本地服务器
   - 静态托管本目录
   - POST /api/chat 代理 OpenAI 兼容接口，解决浏览器 CORS 限制
   运行：node server.js   （默认 http://127.0.0.1:3210）
   ========================================================================== */
"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = __dirname;
const START_PORT = Number(process.env.PORT) || 3210;
const MAX_PORT = START_PORT + 12;
const OPEN_BROWSER = !process.argv.includes("--no-open");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function sendJson(res, status, obj) {
  cors(res);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[\\/])+/, "");
  const file = path.join(ROOT, normalized === "/" ? "index.html" : normalized);
  const resolved = path.resolve(file);
  if (!resolved.startsWith(path.resolve(ROOT))) return null;
  return resolved;
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 4 * 1024 * 1024) throw new Error("请求体过大");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

async function proxyChat(req, res) {
  try {
    const raw = await readBody(req);
    const payload = JSON.parse(raw || "{}");
    const baseUrl = String(payload.baseUrl || "").replace(/\/+$/, "");
    if (!/^https?:\/\//i.test(baseUrl)) {
      return sendJson(res, 400, { error: { message: "Base URL 必须以 http:// 或 https:// 开头。" } });
    }
    const target = /\/chat\/completions$/i.test(baseUrl) ? baseUrl : baseUrl + "/chat/completions";
    const headers = { "Content-Type": "application/json" };
    if (payload.apiKey) headers.Authorization = "Bearer " + payload.apiKey;
    const body = {
      model: payload.model || "deepseek-chat",
      messages: Array.isArray(payload.messages) ? payload.messages : [],
      temperature: typeof payload.temperature === "number" ? payload.temperature : 0.65
    };
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 75000);
    let upstream;
    try {
      upstream = await fetch(target, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timer);
    }
    const text = await upstream.text();
    cors(res);
    res.writeHead(upstream.status, { "Content-Type": "application/json; charset=utf-8" });
    res.end(text);
  } catch (err) {
    const message = err.name === "AbortError" ? "上游接口超时（75 秒）。" : err.message;
    sendJson(res, 502, { error: { message } });
  }
}

function serveStatic(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method Not Allowed");
    return;
  }
  const file = safePath(req.url || "/");
  if (!file) {
    res.writeHead(403); res.end("Forbidden"); return;
  }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      // SPA fallback: unknown path -> index.html
      const index = path.join(ROOT, "index.html");
      fs.readFile(index, (e2, data) => {
        if (e2) { res.writeHead(404); res.end("Not Found"); return; }
        res.writeHead(200, { "Content-Type": MIME[".html"], "Cache-Control": "no-cache" });
        res.end(data);
      });
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const headers = { "Content-Type": MIME[ext] || "application/octet-stream" };
    if (ext === ".html" || ext === ".js" || ext === ".css") headers["Cache-Control"] = "no-cache";
    res.writeHead(200, headers);
    if (req.method === "HEAD") { res.end(); return; }
    fs.createReadStream(file).pipe(res);
  });
}

function openBrowser(url) {
  if (!OPEN_BROWSER) return;
  try {
    if (process.platform === "win32") {
      spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
    } else if (process.platform === "darwin") {
      spawn("open", [url], { detached: true, stdio: "ignore" }).unref();
    } else {
      spawn("xdg-open", [url], { detached: true, stdio: "ignore" }).unref();
    }
  } catch (_) { /* ignore */ }
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }
  const pathname = (req.url || "/").split("?")[0];
  if (pathname === "/api/health") {
    sendJson(res, 200, { ok: true, app: "yantai-writing-studio", version: "1.0" });
    return;
  }
  if (pathname === "/api/chat") {
    if (req.method !== "POST") { sendJson(res, 405, { error: { message: "只支持 POST" } }); return; }
    proxyChat(req, res);
    return;
  }
  serveStatic(req, res);
});

function listen(port) {
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && port < MAX_PORT) {
      listen(port + 1);
    } else {
      console.error("\n启动失败：", err.message);
      console.error("请检查端口是否被占用，或设置环境变量 PORT 换个端口。\n");
      process.exit(1);
    }
  });
  server.listen(port, "127.0.0.1", () => {
    const url = `http://127.0.0.1:${port}`;
    console.log("");
    console.log("  砚台 · 考研英语作文工坊");
    console.log("  ─────────────────────────────");
    console.log("  本地地址: " + url);
    console.log("  AI 代理 : " + url + "/api/chat");
    console.log("  停止服务: Ctrl + C");
    console.log("");
    if (OPEN_BROWSER) setTimeout(() => openBrowser(url), 250);
  });
}

listen(START_PORT);
