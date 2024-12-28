"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const apiSchema = new mongoose_1.default.Schema({
    url: String,
    method: String,
    headers: [{
            key: String,
            value: String
        }],
    body: String,
    response: {
        status: Number,
        body: String,
    },
    successApiID: this,
    failureApiID: this
});
const Api = mongoose_1.default.model('API', apiSchema);
exports.default = Api;
//# sourceMappingURL=api.js.map