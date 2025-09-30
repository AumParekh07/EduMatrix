"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const passRoutes_1 = __importDefault(require("./routes/passRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // because sending authorization headers
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1/admin", adminRoutes_1.default);
app.use("/api/v1/student", studentRoutes_1.default);
app.use("/api/v1/auth", passRoutes_1.default);
app.get("/", (req, res) => {
    res.send("<h1 style='color:blue'>SERVER  IS  Running..... </h1>");
});
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
