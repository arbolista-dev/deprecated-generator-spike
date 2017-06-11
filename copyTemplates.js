import fsExtra from 'fs-extra';
import path from 'path';
import fs from 'fs';

const excludes = /(dist|node_modules|\.DS_store)\//;
const includes = /templates\//;
const destPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

function copyDirectory(sourcePath) {
  fs.readdirSync(sourcePath)
    .forEach((filename) => {
      const filePath = path.resolve(sourcePath, filename);
      if (!excludes.test(filePath)) {
        if (fs.statSync(filePath).isDirectory()) {
          copyDirectory(filePath);
        } else if (includes.test(filePath)) {
          const relativePath = filePath.replace(srcPath, '');
          const destinationPath = path.join(destPath, relativePath);
          console.info(`${filePath.replace(`${__dirname}/`, '')} -> ${destinationPath.replace(`${__dirname}/`, '')}`);
          fsExtra.copySync(filePath, destinationPath);
        }
      }
    });
}

copyDirectory(path.resolve(__dirname, 'src'));
