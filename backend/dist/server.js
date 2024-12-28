"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testDB = testDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function testDB() {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/amrutamAssignment');
        console.log("Connected to database");
    }
    catch (e) {
        console.log("Cannot connect to database", e);
    }
}
//# sourceMappingURL=server.js.map