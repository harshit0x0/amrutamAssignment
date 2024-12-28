"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trigger_1 = __importDefault(require("../model/trigger"));
const uuid_1 = require("uuid");
const TriggerRouter = express_1.default.Router();
TriggerRouter.post('/new', async (req, res) => {
    try {
        const triggerData = req.body;
        triggerData.id = (0, uuid_1.v4)();
        const trigger = new trigger_1.default(triggerData);
        await trigger.save();
        console.log("New Trigger Created!!");
        res.status(200).send(trigger);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
exports.default = TriggerRouter;
//# sourceMappingURL=trigger.js.map