// @ts-check

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const srcPath = path.join(__dirname, '../src');
const publicPath = path.join(__dirname, '../public');

const files = fs.readdirSync(srcPath, { withFileTypes: true });

/**
 * @type {{[category: string]: string[]}}
 */
const examples = {};

files
    .filter((file) => file.isDirectory())
    .sort((a, b) => {
        const aTime = fs.statSync(path.join(srcPath, a.name, 'index.html')).birthtime;
        const bTime = fs.statSync(path.join(srcPath, b.name, 'index.html')).birthtime;
        return aTime < bTime ? -1 : 1;
    })
    .forEach((folder) => {
        const indexHtml = fs.readFileSync(path.join(srcPath, folder.name, 'index.html'), 'utf-8');
        const titleMatch = indexHtml.match(/<title>(.+)<\/title>/);
        const title = titleMatch?.[1];
        if (!title) {
            console.log(
                `Not found a title for the example in the index.html in the folder ${folder.name}`,
            );
            return '';
        }

        const descriptionMatch = indexHtml.match(
            /<meta\s+name="description"\s+content="(.+)"\s*\/>/,
        );
        const description = descriptionMatch?.[1];
        if (!title || !description) {
            console.log(
                `Not found a description for the example in the index.html in the folder ${folder.name}`,
            );
            return '';
        }

        const categoryMatch = indexHtml.match(/<meta\s+name="category"\s+content="(.+)"\s*\/>/);
        const category = categoryMatch?.[1];
        if (!category) {
            console.log(
                `Not found a category for the example in the index.html in the folder ${folder.name}`,
            );
            return '';
        }

        const previewPath = `${folder.name}/preview.png`;
        const previewExists = fs.existsSync('src/' + previewPath);
        if (!previewExists) {
            console.log(
                `In a folder ${folder.name} must be preview.png image with resolution 400x300`,
            );
            return '';
        }

        const html = /* HTML */ `<div class="example">
            <div class="example-preview">
                <img height="300" width="400" src="./${previewPath}" />
            </div>
            <div class="example-title">${title}</div>
            <div class="example-desc">${description}</div>
            <div>
                <a href="./${folder.name}">[demo]</a>
                <a href="https://github.com/2gis/mapgl-examples/tree/main/src/${folder.name}"
                    >[source]</a
                >
            </div>
        </div>`;

        if (!examples[category]) {
            examples[category] = [];
        }
        examples[category].push(html);
    });

let examplesHtml = '';
Object.entries(examples).forEach(([category, htmlParts]) => {
    examplesHtml += /* HTML */ `<div class="category">
        <h2 id="${category}"><a href="#${category}">${category}</a></h2>
        <div class="category-content">${htmlParts.join('\n')}</div>
    </div>`;
});

const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8');

try {
    fs.mkdirSync(publicPath);
} catch (e) {}

execSync('cp -r src/* public');

fs.writeFileSync(
    path.join(__dirname, '../public/index.html'),
    template.replace('{{EXAMPLES}}', examplesHtml),
    'utf-8',
);
