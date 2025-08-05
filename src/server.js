import express from "express";
import { ENV } from "./config/env.js";            // if you have this
import { router as favoritesRoute } from "./routes/favoritesRoute.js";
import job from "./config/cron.js";

const app = express();
const port = ENV?.PORT ?? process.env.PORT ?? 5001;

if(ENV.NODE_ENV === "production"){
  job.start();
}

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.use("/api/favorites", favoritesRoute); 

app.listen(port, () => {
  console.log("Server running on PORT:", port);
});