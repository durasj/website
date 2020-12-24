import { createServer } from "http";
import { exists, readFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import through2 from "through2";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
// @ts-ignore TODO: Missing node module types
import precss from "precss";
import { watch as gulpWatch, src, dest, parallel } from "gulp";
import File from "vinyl";
// @ts-ignore TODO: Missing node module types
import ejs from "gulp-ejs";
import htmlmin from "gulp-htmlmin";
import handler from "serve-handler";

import { generateContent } from "./content";

const asyncExists = promisify(exists);
const asyncReadfile = promisify(readFile);

const css = () =>
  through2.obj(async (file: File, encoding, next) => {
    if (file.contents === null) return next(null, file);
    const cssPath = join(file.base, file.basename.replace(".html", ".css"));
    if (!(await asyncExists(cssPath))) return next(null, file);

    // All !imporant has to be removed for AMP
    const noImportant = postcss.plugin(
      "postcss-remove-important",
      (options = {}) => (css) => {
        css.walkDecls((decl) => {
          decl.important = false;
        });
      }
    );

    // Load and process csswith postcss
    const cssFile = await asyncReadfile(cssPath);
    const result = await postcss([precss, autoprefixer, noImportant]).process(
      cssFile,
      {
        from: cssPath,
      }
    );

    const contentsWithCSS = file.contents
      .toString()
      .replace(
        /<!-- injectcss -->.*<!-- endinject -->/,
        `<style amp-custom>${result.css}</style>`
      );

    file.contents = Buffer.from(contentsWithCSS, "utf8");
    next(null, file);
  });

async function build() {
  return src("src/index.html")
    .pipe(ejs({ projects: await generateContent("./content") }))
    .pipe(css())
    .pipe(htmlmin({ minifyCSS: true, minifyJS: true }))
    .pipe(dest("dist"));
}

export function copyStatic() {
  return src("./static/**/*")
    .pipe(dest("dist"))
    .pipe(src("content/*/photos/*"))
    .pipe(dest("dist/content"));
}

export function watch() {
  gulpWatch(["src/**/*", "content/**/*"], { ignoreInitial: false }, build);
  gulpWatch(
    ["static/**/*", "content/*/photos/*"],
    { ignoreInitial: false },
    copyStatic
  );

  createServer((request, response) =>
    handler(request, response, {
      cleanUrls: true,
      public: "./dist",
    })
  ).listen(3000, () => {
    console.log("Running at http://localhost:3000");
  });
}

const buildWithStatic = parallel(copyStatic, build);

export default buildWithStatic;
