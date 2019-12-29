# Personal Website
Repo for my simple personal portfolio hosted at duras.me. There isn't a lot to see, but you are free to look around.

Content is managed as directory structure with markdown files and photos.

```
|- content/ - Projects - each in its own dir with content.md and photos subdir
|- cypress/ - Cypress E2E test files.
|- src/     - Source code - scss and ts(x) - each component in its own dir incl. unit test
|- static/  - Static files copied as-is to dist/
|- testing/ - Files related to unit testing like mocks and coverage.
|- *.*      - Configuration files and other files.
```

## Attribution

- Powered by [React](https://reactjs.org/)
- Bundled using [parcel](https://parceljs.org/)
- Markdown content converted using [marked](https://github.com/chjj/marked)
- Icons [Linearicons](https://linearicons.com) from [Perxis](https://perxis.com/)
- ... and kudos to many others, see [package.json](https://github.com/durasj/website/blob/master/package.json)

## TODO

- Redesign with various polygons as cards, simple transitions.
- Rewrite to modern react with hooks.
- Drop scss?
- Break down the Me.tsx (move the routing and global imports like Projects to app.tsx?).

## TODO Content Generator

- Better, optimized images (raw images with optimization at build time, better serving).

## TODO Content

- Group even more projects together (websites under graphic design etc.)
- iERP.ai
- Octosign
- Pixea
