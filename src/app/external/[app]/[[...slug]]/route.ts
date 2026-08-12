import fs from "fs";
import path from "path";

function contentTypeFromExt(ext: string) {
  const map: Record<string, string> = {
    html: "text/html; charset=utf-8",
    js: "application/javascript; charset=utf-8",
  mjs: "application/javascript; charset=utf-8",
  cjs: "application/javascript; charset=utf-8",
  ts: "application/javascript; charset=utf-8",
  tsx: "application/javascript; charset=utf-8",
    css: "text/css; charset=utf-8",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    json: "application/json",
    wasm: "application/wasm",
    map: "application/json",
    ico: "image/x-icon",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    txt: "text/plain; charset=utf-8",
  };
  return map[ext.toLowerCase()] || "application/octet-stream";
}

function resolveProjectRoot(appName: string) {
  const cwd = process.cwd();
  const workspaceRoot = path.resolve(cwd, "..");
  const resolved = path.resolve(workspaceRoot, appName);
  if (!resolved.startsWith(workspaceRoot)) throw new Error("Invalid app path");
  return resolved;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ app: string; slug?: string[] }> },
) {
  const { app: rawApp, slug: rawSlug } = await params;
  const app = decodeURIComponent(rawApp);
  const slug = rawSlug ?? [];
  const projectRoot = resolveProjectRoot(app);

  // locate the app root (the folder that contains index.html)
  const possibleIndexCandidates = [
    path.join("dist", "index.html"),
    path.join("dist", "public", "index.html"),
    path.join("build", "index.html"),
    path.join("public", "index.html"),
    path.join("client", "index.html"),
    "index.html",
  ];

  let appRootDir: string | null = null;
  let indexPath: string | null = null;

  // check root and common locations
  for (const c of possibleIndexCandidates) {
    const p = path.join(/*turbopackIgnore: true*/ projectRoot, c);
    if (fs.existsSync(/*turbopackIgnore: true*/ p) && fs.statSync(/*turbopackIgnore: true*/ p).isFile()) {
      indexPath = p;
      appRootDir = path.dirname(p);
      break;
    }
  }

  // check subdirectories one level deep
  if (!indexPath) {
    try {
      const subents = fs.readdirSync(/*turbopackIgnore: true*/ projectRoot, { withFileTypes: true });
      for (const s of subents) {
        if (!s.isDirectory()) continue;
        for (const c of possibleIndexCandidates) {
          const p = path.join(/*turbopackIgnore: true*/ projectRoot, s.name, c);
          if (fs.existsSync(/*turbopackIgnore: true*/ p) && fs.statSync(/*turbopackIgnore: true*/ p).isFile()) {
            indexPath = p;
            appRootDir = path.dirname(p);
            break;
          }
        }
        if (indexPath) break;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!indexPath || !appRootDir) {
    return new Response("Not Found", { status: 404 });
  }

  // If slug is empty, serve the index file directly (which works around Next.js folder routing)
  if (!slug || slug.length === 0 || (slug.length === 1 && slug[0] === "index.html")) {
    let html = fs.readFileSync(/*turbopackIgnore: true*/ indexPath, "utf8");

    // Rewrite absolute-root asset URLs (src="/..." href="/..." srcset="/...")
    // so they point under /external/<app>/... and are served by this route.
    const prefix = `/external/${encodeURIComponent(app)}/`;
    html = html.replace(/(\b(?:src|href|srcset)\s*=\s*["'])\/([^"']*)/gi, (match, p1, p2) => {
      // If it already starts with external/ or the app name, handle it cleanly
      if (p2.startsWith(`external/`)) return match;
      if (p2.startsWith(`${app}/`)) return `${p1}${prefix}${p2.substring(app.length + 1)}`;
      return `${p1}${prefix}${p2}`;
    });

    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  // Serve assets relative to the discovered appRootDir
  const relPath = path.join(/*turbopackIgnore: true*/ ...slug);
  const filePath = path.join(/*turbopackIgnore: true*/ appRootDir, relPath);
  if (fs.existsSync(/*turbopackIgnore: true*/ filePath) && fs.statSync(/*turbopackIgnore: true*/ filePath).isFile()) {
    const buffer = fs.readFileSync(/*turbopackIgnore: true*/ filePath);
    const ext = path.extname(filePath).replace(".", "") || "";
    const ct = contentTypeFromExt(ext);
    return new Response(buffer, { status: 200, headers: { "Content-Type": ct } });
  }

  return new Response("Not Found", { status: 404 });
}
