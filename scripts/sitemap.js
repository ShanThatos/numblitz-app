const fs = require("fs");

const baseUrl = "https://numblitz.shanthatos.dev/";

function collectUrlPaths(dirPath) {
  const files = fs.readdirSync(dirPath);

  return files.flatMap((file) => {
    if (file.includes("[")) return [];

    const filePath = `${dirPath}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      return collectUrlPaths(filePath);
    }

    const url = baseUrl + filePath.slice(7);
    if (url.endsWith("index.html")) return [url.slice(0, -10)];
    else if (url.endsWith(".html")) return [url.slice(0, -5)];

    return [];
  });
}

const sitemap = [];
const dirs = ["practice"];
for (const dir of dirs) {
  sitemap.push(...collectUrlPaths(`./dist/${dir}`));
}

sitemap.sort((a, b) => a.localeCompare(b));

fs.writeFileSync("./public/sitemap.txt", sitemap.join("\n"));
fs.writeFileSync("./dist/sitemap.txt", sitemap.join("\n"));
