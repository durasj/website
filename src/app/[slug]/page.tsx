import React from 'react';
import { getProject } from '@/utils/projects';
import Button from '@/components/Button';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter, images } = await getProject(params.slug);

  const coverImage = images.find((i) => i.name === 'index')?.path;

  return {
    title: `${frontmatter.title} - Jakub Duras - Software Engineer`,
    openGraph: coverImage
      ? {
          images: [coverImage],
        }
      : {},
  };
}

export default async function ProjectPage({ params: { slug } }: Props) {
  const { content, frontmatter, images } = await getProject(slug, {
    imageSize: true,
  });

  const relevantImages = images.filter((p) => p.name !== 'index');

  return (
    <div className="flex flex-col w-full">
      <header className="p-6">
        <div className="flex flex-row items-center justify-between lg:mx-auto lg:w-[80rem]">
          <div className="flex items-center gap-4">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="w-12" src="/logo.svg" alt="" />
              <span className="sr-only">Home</span>

              <span className="hidden md:inline text-2xl font-semibold tracking-tight text-zinc-900">
                Jakub Duras
              </span>
            </Link>
          </div>

          <div className="flex gap-4">
            <Button href="/" type="dark">
              Close
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-12 p-6 my-6 lg:mx-auto lg:w-[80rem]">
        <div className="flex flex-col gap-4 mx-auto max-w-2xl lg:text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="text-base font-semibold leading-7 text-zinc-900">
            {frontmatter.type === 'commercial'
              ? 'Full-Time Commercial Project'
              : 'Open Source Software'}
          </p>

          <p className="text-lg leading-8 text-zinc-600">
            {frontmatter.description}
          </p>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {frontmatter.links.map((item) => (
              <Button key={item.link} href={item.link} type="light">
                {item.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <article className="prose prose-zinc">{content}</article>

          <div className="flex flex-col gap-8 py-8">
            {relevantImages.map((image) => (
              <Image
                key={image.path}
                className="object-cover object-top rounded-2xl shadow-3xl bg-white"
                src={image.path}
                alt={image.name}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <h2 className="font-semibold mb-4">
              {frontmatter.type === 'commercial' ? 'Position' : 'Timeline'}
            </h2>

            {frontmatter.positions.map((item) => (
              <div key={item.title} className="flex flex-row gap-4">
                <time
                  dateTime={item.period}
                  className="flex items-center text-sm font-semibold leading-6 text-zing-900"
                >
                  <svg
                    viewBox="0 0 4 4"
                    className="mr-4 h-1 w-1 flex-none"
                    aria-hidden="true"
                  >
                    <circle cx={2} cy={2} r={2} fill="currentColor" />
                  </svg>
                  {item.period}
                </time>

                <p className="text-sm font-semibold leading-8 tracking-tight text-zinc-900">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex-1">
            <h2 className="font-semibold mb-4">Skills</h2>

            <dl className="flex flex-row flex-wrap gap-4">
              {frontmatter.skills.map((item) => (
                <dt key={item} className="text-sm line text-zinc-900">
                  {item}
                </dt>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
