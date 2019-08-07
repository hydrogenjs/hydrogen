import glob from 'glob';

export default (pattern: string): Promise<string[]> => new Promise((resolve, reject): void => {
  glob(pattern, (err, files): void => {
    if (err) {
      return reject(err);
    }

    resolve(files);
  });
});
