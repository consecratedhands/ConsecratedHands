import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const srcRoot=join(frontendRoot,"src");
const appSource=readFileSync(join(srcRoot,"App.js"),"utf8");
const sitemapSource=readFileSync(join(frontendRoot,"public","sitemap.xml"),"utf8");

function sourceFiles(directory){
  return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
    const path=join(directory,entry.name);
    return entry.isDirectory()?sourceFiles(path):/\.(js|jsx)$/.test(entry.name)?[path]:[];
  });
}

function fail(message){
  console.error(`Site audit failed: ${message}`);
  process.exitCode=1;
}

const routes=new Set([...appSource.matchAll(/<Route\s+path=["']([^"']+)["']/g)].map(match=>match[1]));
const publicRoutes=[...routes].filter(route=>route!=="*"&&route!=="/donation/success");
const sitemapRoutes=new Set([...sitemapSource.matchAll(/<loc>https:\/\/consecratedhands\.com([^<]*)<\/loc>/g)].map(match=>match[1]||"/"));

for(const route of publicRoutes){
  if(!sitemapRoutes.has(route))fail(`route ${route} is missing from sitemap.xml`);
}
for(const route of sitemapRoutes){
  if(!routes.has(route))fail(`sitemap route ${route} is missing from App.js`);
}

const files=sourceFiles(srcRoot);
for(const file of files){
  const source=readFileSync(file,"utf8");
  for(const match of source.matchAll(/\bto\s*(?:=|:)\s*["'](\/[^"'#?]*)["']/g)){
    if(!routes.has(match[1]))fail(`${file} links to an undefined route: ${match[1]}`);
  }
  for(const match of source.matchAll(/["'](\/img\/[^"']+)["']/g)){
    if(!existsSync(join(frontendRoot,"public",match[1])))fail(`${file} references a missing image: ${match[1]}`);
  }
  for(const match of source.matchAll(/<img\b[^>]*>/g)){
    if(!/\balt=/.test(match[0]))fail(`${file} contains an image without alt text`);
  }
}

const pageMainTags=files.filter(file=>file.includes(`${join("src","pages")}`)).flatMap(file=>{
  const count=(readFileSync(file,"utf8").match(/<main\b/g)||[]).length;
  return count?[`${file} (${count})`]:[];
});
if(pageMainTags.length)fail(`Layout owns the main landmark; nested main tags found in ${pageMainTags.join(", ")}`);

if(process.exitCode)process.exit(process.exitCode);
console.log(`Site audit passed: ${publicRoutes.length} public routes, ${files.length} source files, and all referenced images checked.`);
