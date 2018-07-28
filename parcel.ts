import chokidar from 'chokidar';
import fs from 'fs';
import http from 'http';
import Bundler from 'parcel-bundler';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import rimraf from 'rimraf';
import handler from 'serve-handler';
import syncDirectory from 'sync-directory';
import { promisify } from 'util';
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const rimrafAsync = promisify(rimraf);

import generateContent from './content';
import Me from './src/Me';

// Entrypoint file location
const entryFile = path.join(__dirname, './src/index.html');

// Bundler options
const options = {
    outDir: './dist',
    outFile: 'index.html',
    logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
    detailedReport: true,
};

async function runBundle() {
    await rimrafAsync('./dist/*');

    // Initializes a bundler using the entrypoint location and options provided
    const bundler = new Bundler(entryFile, options);

    // "Server side rendering" ... more like build time rendering :)
    // TODO: Reconsider in the future, I don't like that mailto: and number are in the source code
    // Everything is otherwise prepared
    if (process.env.NODE_ENV === 'production' && true !== true) {
        bundler.on('buildEnd', async () => {
            const outputFile = path.join(__dirname, './dist/index.html');
            const index = await readFileAsync(outputFile);
            const html = renderToString(React.createElement(Me));
            const renderedIndex = index.toString().replace(
                '<ssr replaceme=""></ssr>',
                html,
            );

            await writeFileAsync(
                outputFile,
                renderedIndex,
            );
        });
    };

    /**
     * Static resources copying
     */
    syncDirectory('./static', './dist', {
        type: 'copy',
    });
    syncDirectory('./content', './dist/content', {
        type: 'copy',
        exclude: /.md/,
        watch: process.env.NODE_ENV !== 'production',
    });

    // Markdown files
    // TODO: Register packager in the parcel js?
    if (process.env.NODE_ENV === 'production') {
        generateContent();
    } else {
        generateContent();

        chokidar.watch('./content/*/*.md', {
            persistent: true,
            ignoreInitial: true,
        })
            .on('add', generateContent)
            .on('change', generateContent)
            .on('unlink', generateContent);
    }

    // Run the bundler, this returns the main bundle
    // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
    await bundler.bundle();

    if (process.env.NODE_ENV !== 'production') {
        const server = http.createServer((request, response) => {
            return handler(request, response, {
                public: 'dist',
                rewrites: [
                    { source: '/*', destination: '/index.html' },
                ],
            });
        })

        server.listen(3333, () => {
            // tslint:disable-next-line:no-console
            console.log('Running at http://localhost:3333');
        });
    }
}

runBundle();
