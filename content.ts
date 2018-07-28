import fm from 'front-matter';
import fs from 'fs';
import md from 'marked';
import sm from 'sitemap';

export default function generateContent() {
    const rootDir = './';
    const contentDir = './content';
    const srcDir = './src';

    const projects = fs.readdirSync(contentDir)
        .map((projectId) => {
            const rawContent = fs.readFileSync(contentDir + '/' + projectId + '/content.md', 'utf8');
            const content = fm(rawContent);

            return { projectId, content };
        })
        .map(({ projectId, content }) => {
            const meta = content.attributes as any;

            // Photos
            let photos;
            const photosDir = contentDir + '/' + projectId + '/photos';
            if (fs.existsSync(photosDir)) {
                photos = fs.readdirSync(photosDir)
                    .map((photoName) => ({
                        src: encodeURI(photosDir + '/' + photoName).substr(1),
                        caption: photoName.split('.')[0],
                    }));
            }

            return {
                id: projectId,
                title: meta.title,
                type: meta.type || 'commercial',
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
            };
        })
        .sort((a, b) => b.period.substr(-4) - a.period.substr(-4));

    fs.writeFileSync(srcDir + '/content.json', JSON.stringify(projects));

    // Sitemap
    const sitemap = sm.createSitemap ({
        hostname: 'https://duras.me',
        urls: projects.map((project) => {
            const url = {
                url: '/' + project.id,
                img: undefined,
            };

            if (project.photos) {
                url.img = project.photos.map((photo) => ({
                    url: photo.src,
                    caption: photo.caption,
                }));
            }
            return url;
        }),
    });

    fs.writeFileSync(rootDir + 'static/sitemap.xml', sitemap.toString());
}
