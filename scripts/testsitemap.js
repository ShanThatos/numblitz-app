const fs = require("fs");

async function testurls(urls) {
  const results = await Promise.all(
    urls.map(async (line) => (await fetch(line)).status),
  );

  const failedUrls = urls.filter((_, index) => results[index] !== 200);
  if (failedUrls.length > 0) {
    console.log("Failed URLs:");
    failedUrls.forEach((url) => console.log(url));
  } else {
    console.log("All URLs are reachable.");
  }
  console.log("Total URLs checked:", urls.length);
  console.log("Total failed URLs:", failedUrls.length);
}

async function main() {
  console.log("Deployed sitemap test:");
  await testurls(
    (
      await (await fetch("https://numblitz.shanthatos.dev/sitemap.txt")).text()
    ).split("\n"),
  );

  console.log("Local sitemap test:");
  await testurls(fs.readFileSync("./dist/sitemap.txt", "utf-8").split("\n"));
}

main();
