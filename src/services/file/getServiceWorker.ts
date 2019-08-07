import fs from 'fs-extra';

const CWD = process.cwd();

export default async (sw: string): Promise<Buffer|boolean> => {
  if (!sw) {
    return false;
  }

  return fs.readFile(`${CWD}/${sw}`);
};
