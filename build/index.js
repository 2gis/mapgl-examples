const path = require('path');
const fs = require('fs');

const srcPath = path.join(__dirname, '../src');

const files = fs.readdirSync(srcPath, { withFileTypes: true });

const examples = files
    .filter((file) => file.isDirectory())
    .sort((a, b) => {
        const aTime = fs.statSync(path.join(srcPath, a.name, 'index.html')).birthtime;
        const bTime = fs.statSync(path.join(srcPath, b.name, 'index.html')).birthtime;
        return aTime - bTime;
    })
    .map((folder) => {
        const indexHtml = fs.readFileSync(path.join(srcPath, folder.name, 'index.html'), 'utf-8');
        const titleMatch = indexHtml.match(/<title>(.+)<\/title>/);
        const title = titleMatch?.[1];

        const descriptionMatch = indexHtml.match(
            /<meta\s+name="description"\s+content="(.+)"\s*\/>/,
        );
        const description = descriptionMatch?.[1];

        const previewPath = `${folder.name}/preview.png`;
        const previewExists = fs.existsSync('src/' + previewPath);

        if (!title || !description) {
            console.log(
                `Not found a title or a description for the example in the index.html in the folder ${folder.name}`,
            );
            return '';
        }
        if (!previewExists) {
            console.log(
                `In a folder ${folder.name} must be preview.png image with resolution 400x300`,
            );
            return '';
        }

        return /* HTML */ `<div class="example">
            <img height="300" width="400" src="./${previewPath}" />
            <div class="example-title">${title}</div>
            <div class="example-desc">${description}</div>
            <div>
                <a href="./${folder.name}">[demo]</a>
                <a href="https://github.com/2gis/mapgl-examples/tree/main/src/${folder.name}"
                    >[source]</a
                >
            </div>
        </div>`;
    })
    .join('\n');

const template = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8');

try {
    fs.mkdirSync(path.join(__dirname, '../public'));
} catch (e) {}

fs.writeFileSync(
    path.join(__dirname, '../public/index.html'),
    template.replace('{{EXAMPLES}}', examples),
    'utf-8',
);
