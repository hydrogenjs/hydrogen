import fs from 'fs-extra';

const getPages = async () => {
  return fs.readdir('./pages');
};

export const builder = async () => {
  console.log(await getPages());
};