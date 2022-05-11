import { Router } from "express";
import {
	addBookmark,
	deleteItemFromBookmarks,
	getBookmarks,
} from "@controllers/bookmarks";
import auth from "@middlewares/auth";
const router = Router();

// @desc Get all bookmarked products
// @route GET /bookmarks
router.get("/", auth, getBookmarks);

// @desc Add a product to bookmarks
// @route POST /bookmarks
router.post("/", auth, addBookmark);

// @desc Delete an item from bookmarks
// @route DELETE /bookmarks/:_id
router.delete("/:_id", deleteItemFromBookmarks);

export default router;
