import express from "express";
import { favoritesTable } from "../db/schema.js";
import { db } from "../config/db.js";
import { eq, and } from "drizzle-orm";

export const addFavorite = async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookingTime, servings } = req.body;
    if (!userId || !recipeId || !title) {
      return res.status(404).json({ message: "404 NOT FOUND" });
    }

    const newFav = await db
      .insert(favoritesTable)
      .values({ userId, recipeId, title, image, cookingTime, servings })
      .returning();
    res.status(201).json(newFav[0]);
  } catch (error) {
    console.error("ERROR in addFavorite", error);
    res.status(500).json({ message: "INTERNAL SERVER PROBLEMS" });
  }
};

export const getFavourites = async (req, res) => {
  try {
    const { userId } = req.params;
    

    const userFavs = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(userFavs);
  } catch (error) {
    console.error("ERROR in getFavourites", error);
    res.status(500).json({ message: "INTERNAL SERVER PROBLEMS" });
  }
};

export const deleteFromFavourites = async(req,res)=> {
    try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
      );

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
