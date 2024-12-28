"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const trigger_1 = __importDefault(require("../model/trigger"));
module.exports.getTrigger = async function (req, res) {
    try {
        const id = req.params.id;
        const trigger = await trigger_1.default.findOne({ _id: id }).populate('linkedApiID');
        if (trigger === null)
            res.status(404).send("Trigger not found");
        console.log("Trigger Found!!");
        res.status(200).send(trigger);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
module.exports.createTrigger = async function (req, res) {
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
};
module.exports.updateTrigger = async function (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const trigger = await trigger_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
        if (trigger === null)
            res.status(404).send("Trigger not found");
        console.log("Trigger Updated!!");
        res.status(200).send(trigger);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
module.exports.deleteTrigger = async function (req, res) {
    try {
        const id = req.params.id;
        const trigger = await trigger_1.default.findOneAndDelete({ _id: id });
        if (trigger === null)
            res.status(404).send("Trigger not found");
        console.log("Trigger Deleted!!");
        res.status(200).send(trigger);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
exports.default = module.exports;
//# sourceMappingURL=triggerControllers.js.map