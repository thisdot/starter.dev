const path = require('path');
const fs = require('fs');

const packageJsonPath = path.resolve(__dirname, '../../package.json');
const projectPackageJsonString = fs.readFileSync(packageJsonPath, { encoding: 'utf-8' });
const projectPackageJson = JSON.parse(projectPackageJsonString);

const productionPackageJson = {
  name: projectPackageJson.name || '',
  version: projectPackageJson.version || '',
  description: projectPackageJson.description || '',
  author: projectPackageJson.author || '',
  license: projectPackageJson.license || '',
  dependencies: projectPackageJson.dependencies,
};

const distFolderPath = path.resolve(__dirname, '../../dist');
const isDistFolderExisting = fs.existsSync(distFolderPath);
if (!isDistFolderExisting) {
  fs.mkdirSync(distFolderPath);
}

const productionPackageJsonString = JSON.stringify(productionPackageJson, null, 2);

fs.writeFileSync(path.join(distFolderPath, 'package.json'), productionPackageJsonString, { encoding: "utf-8" })
