const fs = require('fs');
const fm = require('front-matter');
const md = require('marked');
const sm = require('sitemap');

const rootDir = './';
const contentDir = './content';
const appDir = './app';

const projects = fs.readdirSync(contentDir)
    .map(projectId => {
        const rawContent = fs.readFileSync(contentDir + '/' + projectId + '/content.md', 'utf8');
        const content = fm(rawContent);
        const meta = content.attributes;
        const html = md(content.body);

        // Photos
        let photos = undefined;
        const photosDir = contentDir + '/' + projectId + '/photos';
        if (fs.existsSync(photosDir)) {
            photos = fs.readdirSync(photosDir)
                .map(photoName => ({
                    src: encodeURI(photosDir + '/' + photoName).substr(1),
                    caption: photoName.split('.')[0]
                }));
        }

        return {
            id: projectId,
            title: meta.title,
            size: meta.size,
            color: meta.color,
            description: meta.description,
            period: meta.period,
            skills: meta.skills,
            photos: photos,
            animation: meta.animation,
            content: html,
        };
    })
    .sort((a, b) => b.period.substr(-4) - a.period.substr(-4));

fs.writeFileSync(appDir + '/content.json', JSON.stringify(projects));

// Sitemap
const sitemap = sm.createSitemap ({
    hostname: 'https://duras.me',
    urls: projects.map(project => {
        let url = { url: '#' + project.id };
        if (project.photos) url.img = project.photos.map(photo => ({
            url: photo.src,
            caption: photo.caption
        }));
        return url;
    })
});

fs.writeFileSync(rootDir + 'sitemap.xml', sitemap.toString());
