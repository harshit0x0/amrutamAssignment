"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server");
const trigger_1 = __importDefault(require("./routes/trigger"));
const journey_1 = __importDefault(require("./routes/journey"));
const api_1 = __importDefault(require("./routes/api"));
async function main() {
    console.clear();
    await (0, server_1.testDB)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    try {
        app.listen(3000, () => console.log("Server is running on port 3000\n\n"));
    }
    catch (e) {
        console.log("\n\nSERVER NOT STARTED!! ", e);
    }
    app.use('/trigger', trigger_1.default);
    app.use('/journey', journey_1.default);
    app.use('/api', api_1.default);
}
try {
    main();
}
catch (e) {
    console.log(e);
}
//# sourceMappingURL=index.js.map