import { readFile, readdir } from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import path, { join } from 'path';
import { ReactElement } from 'react';
import sizeOf from 'image-size';

export interface ProjectMeta {
  title: string;
  description: string;
  type?: 'commercial' | 'open-source';
  position?: number;
  period: string;
  skills: string[];
  positions: { period: string; title: string }[];
  links: { name: string; link: string }[];
  show?: false;
}

export interface Project {
  slug: string;
  frontmatter: ProjectMeta;
  content: ReactElement;
  images: {
    name: string;
    path: string;
  }[];
}

const compile = (source: string) =>
  compileMDX<ProjectMeta>({
    source,
    options: { parseFrontmatter: true },
  });

const getImages = async (slug: string, size?: true) => {
  const files = (
    await readdir(`./public/${slug}/`, { withFileTypes: true })
  ).filter((i) => !i.isDirectory());

  console.log(files);

  return files.map((f) => ({
    name: path.parse(f.name).name,
    path: `/${slug}/${f.name}`,
    ...(size ? sizeOf(`public/${slug}/${f.name}`) : {}),
  }));
};

export const getProjects = async (options?: { imageSize?: true }) => {
  const dirs = (await readdir('./content', { withFileTypes: true })).filter(
    (i) => i.isDirectory(),
  );

  return dirs.map(async ({ name }) => {
    const source = await readFile(
      join('./content', name, 'content.md'),
      'utf8',
    );
    const project = await compile(source);

    return {
      slug: name,
      ...project,
      images: await getImages(name, options?.imageSize),
    } satisfies Project;
  });
};

export const getProject = async (
  slug: string,
  options?: { imageSize?: true },
) => {
  const source = await readFile(`content/${slug}/content.md`, 'utf8');

  return {
    slug,
    ...(await compile(source)),
    images: await getImages(slug, options?.imageSize),
  } satisfies Project;
};
