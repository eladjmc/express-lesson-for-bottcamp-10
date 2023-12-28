import fs from 'fs';
import path from 'path';

const filePath = path.join(path.resolve(), 'data/movies.json');

// Function to initialize the movies file if it doesn't exist
const initializeMoviesFile = () => {
  // Ensure the directory exists
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create it with an empty array
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf8');
  }
};

const readMoviesFromFile = () => {
  try {
    initializeMoviesFile(); // Ensure the file exists before reading
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading from file:', error); // Detailed error logging
    throw error;
  }
};

const writeMoviesToFile = (movies) => {
  try {
    initializeMoviesFile(); // Ensure the file exists before writing
    fs.writeFileSync(filePath, JSON.stringify(movies, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to file:', error); // Detailed error logging
    throw error;
  }
};

export { readMoviesFromFile, writeMoviesToFile };
