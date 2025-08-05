import express from "express";
import { addFavorite, deleteFromFavourites, getFavourites } from "../controller/favoritesController.js";

export const router = express.Router();

router.post("/", addFavorite);
router.get("/:userId", getFavourites);
router.delete("/:userId/:recipeId", deleteFromFavourites);

export default router;