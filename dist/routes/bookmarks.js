"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookmarks_1 = require("@controllers/bookmarks");
const router = (0, express_1.Router)();
router.get("/", bookmarks_1.getBookmarks);
router.post("/", bookmarks_1.addBookmark);
router.delete("/:_id", bookmarks_1.deleteItemFromBookmarks);
exports.default = router;
