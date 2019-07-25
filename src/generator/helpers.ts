import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

interface Directory {
  dirName: string;
  exists: boolean;
}

const CWD = process.cwd();

export const checkIfLayoutAndPageDirectoriesExist = async (): Promise<[boolean, Directory[]]> => {
  const directoriesToCheck = ['layouts', 'pages'].map(async (dir: string): Promise<Directory> => ({
    dirName: dir,
    exists: await fs.pathExists(path.normalize(`${CWD}/${dir}`)),
  }));

  return Promise.all(directoriesToCheck).then((dirs: Directory[]): [boolean, Directory[]] => [
    dirs.length !== 0 ? !dirs.every(({ exists }) => exists) : false,
    dirs.filter(({ exists }) => !exists),
  ]);
};

export const logDirsThatDontExist = (dirs: Directory[]): void => dirs.forEach(({ dirName }) => console.log(`[${chalk.green(dirName)}] folder does not exist ❌`));

export const checkIfBuildFolderExists = async (): Promise<boolean | void> => {
  if (await fs.pathExists(path.normalize(`${CWD}/dist`))) {
    return false;
  }

  return fs.mkdir(path.normalize(`${CWD}/dist`));
};