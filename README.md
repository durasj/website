# Personal Website
Repo for my simple personal portfolio hosted at duras.me

## TODO
- ~~Photos size reduction - progressive JPEG, size~~
- ~~Intro above portfolio~~
- ~~Choose animation for photo in bg~~
- ~~Multiple photos per tile in format `[{src: string, caption: string}]`~~
  - ~~First is chosen as background~~
  - ~~All displayed in detail with lightbox and captions using [react-image-gallery](https://github.com/xiaolin/react-image-gallery)~~
- ~~Detail white background~~
- ~~Check naming conventions and dir structure~~
- Content
  - YoActivities
  - Portfolio
  - Waste management system & mobile app
  - CMS
  - Network and cloud
  - ~~2015~~
  - ~~2014~~

## TODO Content Generator
~~Gulp task that will generate a JSON content file with all the properties from the directories~~
- ~~*/content* dir will contain subdirectory for each project, file name used as project key~~
  - ~~*photos/* - dir with photos where file name is used as caption~~
  - ~~*content.md* - main content with YAML metadata compiled to jsx (html using [marked](https://github.com/chjj/marked))~~