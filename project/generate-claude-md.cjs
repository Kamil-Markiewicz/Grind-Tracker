#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
//const srcDir = path.join(PROJECT_ROOT, 'src');
const srcDir = PROJECT_ROOT;
const outputFile = path.join(PROJECT_ROOT, 'project/claude.md');

// Configuration
const ignoreDirs = new Set([
    'node_modules',
    '.angular',
    '.git',
    '.vscode',
    'dist',
    'build',
    '.next',
    '.nuxt',
    'coverage',
    '.env',
    '.env.local',
    '__pycache__',
    'out',
    'venv',
    '.venv',
]);

const ignoreFiles = new Set([
    '.DS_Store',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.gitignore',
    '.env',
    '.env.local',
]);

// Add any files you want included here
const includeContentOfFiles = [
    'electron/src/preloads/system.ts',
    'electron/src/main-electron.ts',
    'electron/src/preload.ts',
    'electron/src/renderer.ts',
    'electron/src/system.ts',

    'angular/src/app/api/electronAPI.ts',
    'angular/src/app/api/interfaces/IElectronSystemAPI.ts',
    'angular/src/app/components/index/index.html',
    'angular/src/app/components/index/index.ts'
];

function shouldIgnore(name) {
    return ignoreDirs.has(name) || ignoreFiles.has(name);
}

function generateTree(dir, prefix = '', isLast = true) {
    let output = '';
    const items = fs.readdirSync(dir).filter(item => !shouldIgnore(item));

    items.forEach((item, index) => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        const isLastItem = index === items.length - 1;
        const connector = isLastItem ? '└── ' : '├── ';
        const extension = isLastItem ? '    ' : '│   ';

        output += prefix + connector + item + '\n';

        if (stat.isDirectory()) {
            output += generateTree(
                fullPath,
                prefix + extension,
                isLastItem
            );
        }
    });

    return output;
}

function extractKeyFiles(dir, depth = 2, currentDepth = 0) {
    if (currentDepth >= depth) return [];

    const files = [];
    const items = fs.readdirSync(dir).filter(item => !shouldIgnore(item));

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && (item.endsWith('.md') || item.endsWith('.json') || item === 'package.json')) {
            files.push(fullPath);
        } else if (stat.isDirectory()) {
            files.push(...extractKeyFiles(fullPath, depth, currentDepth + 1));
        }
    });

    return files;
}

function extractContentOfFiles(projectRoot, files) {
    let content = '';

    files.forEach(relativePath => {
        const fullPath = path.join(projectRoot, relativePath);

        if (!fs.existsSync(fullPath)) {
            content += `### \`${relativePath}\`\n\n`;
            content += `> ⚠️ File not found: ${relativePath}\n\n`;
            return;
        }

        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const ext = path.extname(relativePath).slice(1); // e.g. 'ts', 'js'

        content += `### \`${relativePath}\`\n\n`;
        content += `\`\`\`${ext}\n`;
        content += fileContent;
        content += `\n\`\`\`\n\n`;
    });

    return content;
}

function getProjectInfo(projectRoot) {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    let projectInfo = {};

    if (fs.existsSync(packageJsonPath)) {
        try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            projectInfo = {
                name: pkg.name,
                description: pkg.description,
                version: pkg.version,
                type: pkg.type || 'unknown',
            };
        } catch (e) {
            // Ignore parse errors
        }
    }

    return projectInfo;
}

function generateClaudeMd(projectRoot) {
    const projectInfo = getProjectInfo(projectRoot);
    const tree = generateTree(projectRoot);

    let content = '# Project Documentation\n\n';

    if (projectInfo.name) {
        content += `## Project: ${projectInfo.name}\n`;
        if (projectInfo.description) {
            content += `${projectInfo.description}\n\n`;
        }
    }

    content += '## Project Structure\n\n';
    content += '```\n';
    content += tree;
    content += '```\n\n';

    content += '## Key Files\n\n';
    const keyFiles = extractKeyFiles(projectRoot);
    if (keyFiles.length > 0) {
        keyFiles.forEach(file => {
            const relativePath = path.relative(projectRoot, file);
            content += `- \`${relativePath}\`\n`;
        });
    } else {
        content += 'No key configuration files found.\n';
    }

    content += '\n## Documentation\n\n';
    content += 'This file was auto-generated. If you require contents of any specific files, just ask.\n'
    content += '- Architecture and design patterns:\n';
    content += 'Electron app using Angular Framework with Typescript. Angular is decoupled from electron and should only use interfaces to interact with electron.\n';
    content += '- Setup and installation instructions\n';
    content += 'Built using typescript compiler and electron-builder.\n';
    content += '- API documentation\n';
    content += 'Electron: https://www.electronjs.org/\n';
    content += 'Angular: https://angular.dev/\n';
    content += 'electron-builder: https://www.electron.build/index.html\n';
    content += '- Contributing guidelines\n';
    content += 'None yet.\n';

    if (includeContentOfFiles.length > 0) {
        content += '\n## Selected File Contents\n\n';
        content += extractContentOfFiles(projectRoot, includeContentOfFiles);
    }

    return content;
}

// Main execution
//TODOconst projectRoot = process.argv[2] || process.cwd();
const projectRoot = srcDir;

if (!fs.existsSync(projectRoot)) {
    console.error(`Error: Directory not found: ${projectRoot}`);
    process.exit(1);
}

const claudeMdContent = generateClaudeMd(projectRoot);
//TODOconst outputPath = path.join(projectRoot, 'claude.md');
const outputPath = outputFile;

fs.writeFileSync(outputPath, claudeMdContent);
console.log(`✓ Generated claude.md at: ${outputPath}`);