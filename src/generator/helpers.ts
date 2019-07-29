import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';
import glob from 'glob';

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
    dirs.length !== 0 ? !dirs.every(({ exists }): boolean => exists) : false,
    dirs.filter(({ exists }): boolean => !exists),
  ]);
};

export const logDirsThatDontExist = (dirs: Directory[]): void => dirs.forEach(({ dirName }): void => console.log(`[${chalk.green(dirName)}] folder does not exist ❌`));

export const checkIfBuildFolderExists = async (): Promise<boolean | void> => {
  if (await fs.pathExists(path.normalize(`${CWD}/dist`))) {
    return false;
  }

  return fs.mkdir(path.normalize(`${CWD}/dist`));
};

export const copyPublicFolder = async (): Promise<void|boolean> => {
  if (!(await fs.pathExists(path.normalize(`${CWD}/public`)))) {
    return false;
  }

  return fs.copy(path.normalize(`${CWD}/public`), path.normalize(`${CWD}/dist/public`));
};

export const globFiles = async (pattern: string): Promise<string[]> => new Promise((res, rej): void => {
  glob(pattern, (err, files): void => {
    if (err) {
      rej(err);
    }

    res(files);
  });
});

export const tempateGenerator = async (filename: string): Promise<void|boolean> => {
  if (!filename) {
    console.log('\nNo file provided\n');
    return false;
  }

  const file = await import(`${CWD}/${filename}`);
  await fs.outputFile(filename.replace('.js', '.html'), await file.page({ title: file.title, ...file.data ? await file.data() : {} }));
};

// @ts-ignore
export const mapHeadTags = ([tag, props]: [string, object]): string => {
  // @ts-ignore
  const keys = Object.keys(props).map((key: string): string => `${key}="${props[key]}"`).join(' ');
  return `<${tag} ${keys} />`;
};

export const transformHeadToHTML = async (head: (data: object) => Promise<[string, object][]>, data: object): Promise<string> => {
  const tags = await head({ ...data });
  return tags.map(mapHeadTags).join('\n');
};
