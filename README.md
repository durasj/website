# Personal Website

Repo for my simple personal portfolio hosted at [duras.me](https://duras.me). There isn't a lot to see, but you are still free to look around.

Content is managed as directory structure with markdown files and photos.

```
|- content/ - Projects - each in its own dir with content.md and photos subdir
|- cypress/ - Cypress E2E test files.
|- src/     - Source code - scss and ts(x) - each component in its own dir incl. unit test
|- static/  - Static files copied as-is to dist/
|- testing/ - Files related to unit testing like mocks and coverage.
|- *.*      - Configuration files and other files.
```

## Development

After installing the node modules with `npm install`, just run the development server `npm run dev`.

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses mainly Next.js, React, Tailwind, MDX, and Framer Motion.
