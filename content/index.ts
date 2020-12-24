import fm from "front-matter";
import { readFile, exists, readdir } from "fs";
import { promisify } from "util";
import md from "marked";
import { SitemapStream, streamToPromise } from "sitemap";

import { Project, Photo } from "../src/Project";

const asyncReaddir = promisify(readdir);
const asyncReadFile = promisify(readFile);
const asyncExists = promisify(exists);

export async function generateContent(contentDir: string) {
  const projects = (await asyncReaddir(contentDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map(async (dirent) => {
      const projectId = dirent.name;
      const rawContent = await asyncReadFile(
        contentDir + "/" + projectId + "/content.md",
        "utf8"
      );
      const content = fm(rawContent);

      return { projectId, content };
    })
    .map(async (info) => {
      const { projectId, content } = await info;
      const meta = content.attributes as any;

      // Photos
      let photos: Photo[] = [];
      const photosDir = contentDir + "/" + projectId + "/photos";
      if (await asyncExists(photosDir)) {
        photos = (await asyncReaddir(photosDir)).map((photoName) => ({
          src: encodeURI(photosDir + "/" + photoName).substr(1),
          caption: photoName.split(".")[0],
        }));
      }

      return {
        id: projectId,
        title: meta.title,
        type: meta.type || "commercial",
        archived: meta.archived || false,
        size: meta.size,
        color: meta.color,
        description: meta.description,
        period: meta.period,
        skills: meta.skills,
        photos,
        animation: meta.animation,
        link: meta.link,
        linkLabel: meta.linkLabel,
        content: md(content.body),
      } as Project;
    });

  return (await Promise.all(projects)).sort(
    (a, b) => +b.period.substr(-4) - +a.period.substr(-4)
  );
}

export function generateSitemap(projects: Project[]) {
  const stream = new SitemapStream({
    hostname: "https://duras.me",
  });

  projects.forEach((project) => {
    const url = {
      url: "/" + project.id,
      img: undefined as undefined | Array<{ url: string, caption: string }>,
    };

    if (project.photos) {
      url.img = project.photos.map((photo) => ({
        url: photo.src,
        caption: photo.caption,
      }));
    }

    stream.write(url);
  });

  stream.end();

  return streamToPromise(stream);
}
