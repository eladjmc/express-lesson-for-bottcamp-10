import 'dotenv/config';
import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
const app = express();

// cors middleware
app.use(cors());

// Middleware for JSON parsing
app.use(express.json());

// Movie Routes
app.use("/api/v1/movies", movieRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
