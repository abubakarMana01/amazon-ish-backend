import { Router } from "express";
import {
	addBookmark,
	deleteItemFromBookmarks,
	getBookmarks,
} from "@controllers/bookmarks";
const router = Router();

router.get("/", getBookmarks);

router.post("/", addBookmark);

router.delete("/:_id", deleteItemFromBookmarks);

export default router;
