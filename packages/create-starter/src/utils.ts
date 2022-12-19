import path from 'path';
import fs from 'fs/promises';
import { exec } from 'child_process';

export async function fileExists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
}

export async function initGitRepo(path: string) {
  return new Promise((resolve, reject) => {
    exec(`git init ${path}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}

export async function removeLockFileIfExists(fileName: string, directoryPath: string): Promise<boolean> {
  let removed: boolean;
  try {
    await fs.unlink(path.join(directoryPath, fileName));
    removed = true;
  } catch (err) {
    removed = false;
  }
  return removed;
}

export async function overrideAngularJsonIfExists(directoryPath: string, kitName: string, newProjectName: string): Promise<boolean> {
  let done: boolean;
  const angularJsonPath = path.join(directoryPath, 'angular.json');
  try {
    const content = await fs.readFile(angularJsonPath, 'utf8');
    const newContent = content.replace(new RegExp(kitName, 'g'), newProjectName);
    await fs.writeFile(angularJsonPath, newContent);
    done = true;
  } catch (err) {
    done = false;
  }
  return done;
}
