"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.Bookmark = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const schema = new mongoose_1.default.Schema({
    bookmark: {
        ref: "Product",
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    userId: mongoose_1.default.Schema.Types.ObjectId,
});
const Bookmark = mongoose_1.default.model("Bookmark", schema);
exports.Bookmark = Bookmark;
const validate = (product) => {
    const schema = joi_1.default.object({
        _id: joi_1.default.string().required(),
    });
    return schema.validate(product);
};
exports.validate = validate;
