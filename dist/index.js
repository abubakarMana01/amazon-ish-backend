"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = require("dotenv");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// Connect to mongoDb
const dbConnect_1 = __importDefault(require("@startup/dbConnect"));
(0, dbConnect_1.default)();
// app.use(express.json());
app.use(express_1.default.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    },
}));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// Routes
const routes_1 = __importDefault(require("@startup/routes"));
(0, routes_1.default)(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
