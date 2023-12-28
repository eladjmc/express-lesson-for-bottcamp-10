import s3fs from '@cyclic.sh/s3fs';
import path from 'path';

const filePath = path.join(path.resolve(), 'data/movies.json');

const readMoviesFromFile = () => {
  try {
    console.log(filePath);
    const fileData = s3fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error('Error reading from file');
  }
};

const writeMoviesToFile = (movies) => {
  try {
    s3fs.writeFileSync(filePath, JSON.stringify(movies), 'utf8');
  } catch (error) {
    throw new Error('Error writing to file');
  }
};

export { readMoviesFromFile, writeMoviesToFile };
