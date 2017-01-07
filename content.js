const fs = require('fs');
const fm = require('front-matter');
const md = require('marked');

const contentDir = './content';
const appDir = './app';

const projects = fs.readdirSync(contentDir)
    .map(fileName => {
        const fileStat = fs.statSync(contentDir + '/' + fileName);

        return {
            id: fileName,
            created: fileStat.ctime,
            modified: fileStat.mtime
        }
    })
    .sort((a, b) => b.created.getTime() - a.created.getTime())
    .map(project => {
        const rawContent = fs.readFileSync(contentDir + '/' + project.id + '/content.md', 'utf8');
        const content = fm(rawContent);
        const meta = content.attributes;
        const html = md(content.body);

        // Photos
        let photos = undefined;
        const photosDir = contentDir + '/' + project.id + '/photos';
        if (fs.existsSync(photosDir)) {
            photos = fs.readdirSync(photosDir)
                .map(photoName => ({
                    src: photosDir + '/' + photoName,
                    caption: photoName
                }));
        }

        return {
            id: project.id,
            title: meta.title,
            size: meta.size,
            color: meta.color,
            description: meta.description,
            period: meta.period,
            skills: meta.skills,
            photos: photos,
            animation: meta.animation,
            content: html,
            created: project.created,
            modified: project.modified
        };
    });

fs.writeFileSync(appDir + '/content.json', JSON.stringify(projects));
