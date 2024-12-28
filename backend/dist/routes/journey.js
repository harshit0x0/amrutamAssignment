"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journey_1 = __importDefault(require("../model/journey"));
const JourneyRouter = express_1.default.Router();
JourneyRouter.post('/new', async (req, res) => {
    try {
        const journeyData = req.body;
        const journey = new journey_1.default(journeyData);
        await journey.save();
        console.log("New Journey Created!!");
        res.status(200).send(journey);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});
exports.default = JourneyRouter;
//# sourceMappingURL=journey.js.map