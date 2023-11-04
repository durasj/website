import Button from '@/components/Button';
import ProjectItem from '@/components/ProjectItem';
import SensitiveLink from '@/components/SensitiveLink';
import { getProjects } from '@/utils/projects';

export default async function Home() {
  const projects = (await Promise.all(await getProjects()))
    .filter((project) => project.frontmatter.show !== false)
    .sort(
      (a, b) => (a.frontmatter.position || 0) - (b.frontmatter.position || 0),
    );

  return (
    <>
      <header className="relative flex flex-col items-center isolate px-6 py-6">
        <div
          className={`absolute h-[120%] w-full -z-10 transform-gpu overflow-hidden blur-3xl opacity-20 bg-icon bg-center bg-no-repeat`}
          aria-hidden="true"
        ></div>

        <div className="mx-auto max-w-md py-8">
          <div className="text-center">
            <div className="mt-10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-24 w-24 md:h-36 md:w-36 mb-6" src="/logo.svg" alt="" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
              Hi, I&apos;m Jakub!
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-900 opacity-80">
              Below are some of the projects I have worked on as a{' '}
              <strong>software engineer</strong> over the past decade.
            </p>

            <div className="mt-6 flex items-center justify-center gap-x-8">
              <Button href="https://github.com/durasj" type="light">
                GitHub
              </Button>

              <Button href="https://www.linkedin.com/in/jduras/" type="light">
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full my-20">
        <div className="flex flex-col items-center w-full gap-48">
          {projects.map((project, index) => (
            <ProjectItem key={project.slug} index={index} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
