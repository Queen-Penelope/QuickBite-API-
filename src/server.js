import express from "express";
import { ENV } from "./config/env.js";            // if you have this
import { router as favoritesRoute } from "./routes/favoritesRoute.js";

const app = express();
const port = ENV?.PORT ?? process.env.PORT ?? 5001;

app.use(express.json());
app.use("/api/favorites", favoritesRoute); 

app.listen(port, () => {
  console.log("Server running on PORT:", port);
});