import fs from 'fs';

const filePath = 'data/movies.json';

// Function to initialize the movies file if it doesn't exist
const initializeMoviesFile = () => {
  if (!fs.existsSync(filePath)) {
    // If the file doesn't exist, create it with an empty array or default content
    fs.writeFileSync(filePath, JSON.stringify([]), 'utf8');
    console.log("created file");
  }
};

const readMoviesFromFile = () => {
  try {
    initializeMoviesFile(); // Ensure the file exists before reading
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    throw new Error('Error reading from file');
  }
};

const writeMoviesToFile = (movies) => {
  try {
    initializeMoviesFile(); // Ensure the file exists before writing
    fs.writeFileSync(filePath, JSON.stringify(movies), 'utf8');
  } catch (error) {
    throw new Error('Error writing to file');
  }
};

export { readMoviesFromFile, writeMoviesToFile };
