'use client';

import { Project } from '@/utils/projects';
import { FC, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './Button';

export { motion } from 'framer-motion';

// TODO: Make this somehow configurable from markdown
const modoc = 'bg-[#0080F0]';
const chipsAndCode = 'bg-[#5048E5]';
const octosign = 'bg-[#1A1F33]';
const modocShadow = 'shadow-[#0080F0]';
const chipsAndCodeShadow = 'shadow-[#5048E5]';
const octosignShadow = 'shadow-[#1A1F33]';
const colors = [
  { bg: modoc, shadow: modocShadow },
  { bg: chipsAndCode, shadow: chipsAndCodeShadow },
  { bg: octosign, shadow: octosignShadow },
];
const color = (index: number, type: keyof (typeof colors)[0]) =>
  colors[index % colors.length][type];

const ProjectItem: FC<{ project: Project; index: number }> = ({
  project: { slug, images, frontmatter },
  index,
}) => {
  const flip = index % 2;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', `${index == 0 ? 0.8 : 1} 1`],
  });
  const offset = useTransform(scrollYProgress, [0, 1], [64, 0]);

  const bgColor = color(index, 'bg');

  const coverImage = images.find((p) => p.name === 'index');
  if (!coverImage)
    throw Error(`Project ${slug} doesn't have a cover image named index.`);

  return (
    <article
      ref={ref}
      className="relative w-full z-10 bg-zinc-900 pb-20 sm:pb-24 xl:pb-0"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
          <div
            className={`aspect-[1097/1023] w-[68.5625rem] ${bgColor} opacity-25`}
            style={{
              clipPath: `polygon(74% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)`,
            }}
          />
        </div>
      </div>
      <div
        className={`mx-auto flex max-w-7xl flex-col ${
          flip ? 'xl:flex-row' : 'xl:flex-row-reverse'
        } items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:items-stretch`}
      >
        <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:flex-none">
          <motion.div
            className={`relative aspect-[4/3] h-full md:-mx-8 xl:mx-0`}
            initial={{ opacity: 0, top: 64 }}
            style={{
              opacity: scrollYProgress,
              top: offset,
            }}
          >
            <Image
              className="object-cover object-top rounded-2xl shadow-3xl"
              src={coverImage.path}
              alt={coverImage.name}
              height={900}
              width={1200}
            />
          </motion.div>
        </div>
        <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
          <motion.div
            className="relative isolate pt-8 xl:pt-0"
            initial={{ opacity: 0, top: 64 }}
            style={{
              opacity: scrollYProgress,
              top: offset,
            }}
          >
            <h2 className="text-2xl mb-1 font-semibold leading-8 text-white/95 sm:text-3xl sm:leading-9">
              {frontmatter.title}
            </h2>

            <span className="text-white/95 flex items-center">
              {frontmatter.period}{' '}
              {frontmatter.type === 'open-source' ? (
                <abbr
                  className="bg-white/80 text-zinc-900 no-underline ml-2 text-xs py-0.5 px-2 rounded-lg"
                  title="Open Source Software"
                >
                  OSS
                </abbr>
              ) : null}
            </span>

            <p className="text-white/95 text-md font-semibold my-8">
              {frontmatter.description}
            </p>

            <div className="flex items-center flex-wrap gap-4">
              <Button href={`/${slug}`} type="light">
                Details
              </Button>

              {frontmatter.links.map((item) => (
                <Button key={item.link} href={item.link} type="transparentDark">
                  {item.name}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
};

export default ProjectItem;
