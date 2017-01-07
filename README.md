# Personal Website
Repo for my simple personal portfolio hosted at duras.me

## TODO
- ~~Intro above portfolio~~
- ~~Choose animation for photo in bg~~
- ~~Multiple photos per tile in format `[{src: string, caption: string}]`~~
  - ~~First is chosen as background~~
  - ~~All displayed in detail with lightbox and captions using [react-image-gallery](https://github.com/xiaolin/react-image-gallery)~~
- ~~Detail white background~~
- ~~Check naming conventions and dir structure~~
- Content
  - 2017
  - 2016
  - 2015
  - 2014
  - before 2014

## TODO Content Generator
~~Gulp task that will generate a JSON content file with all the properties from the directories~~
- ~~*/content* dir will contain subdirectory for each project, file name used as project key~~
  - ~~*photos/* - dir with photos where file name is used as caption~~
  - ~~*content.md* - main content with YAML metadata compiled to jsx (html using [marked](https://github.com/chjj/marked))~~