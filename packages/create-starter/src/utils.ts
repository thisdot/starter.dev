import { exec } from 'child_process';

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
