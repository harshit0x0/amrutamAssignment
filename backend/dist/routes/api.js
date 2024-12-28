"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../model/api"));
const ApiRouter = express_1.default.Router();
ApiRouter.post('/new', async (req, res) => {
    try {
        const apiData = req.body;
        const api = new api_1.default(apiData);
        await api.save();
        console.log("New API Created!!");
        res.status(200).send(api);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
exports.default = ApiRouter;
//# sourceMappingURL=api.js.map