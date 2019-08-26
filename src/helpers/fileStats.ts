import fs from 'fs-extra';
import chalk from 'chalk';
import glob from './glob';

const CWD = process.cwd();

export default async (): Promise<void> => {
  const files = await glob('dist/**/*.*');

  const fileSizes = await Promise.all(files.map((file): Promise<number> => fs.stat(`${CWD}/${file}`).then((res): number => res.size)));

  const filesTotal = parseFloat((fileSizes.reduce((res, val): number => res + (val / 1024), 0)).toFixed(2));

  console.log(`${chalk.underline('TOTAL FILE SIZE:')} ${chalk.green(`${filesTotal} KB`)}\n`);
};
