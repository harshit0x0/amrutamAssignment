"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trigger_1 = __importDefault(require("./trigger"));
const journeySchema = new mongoose_1.default.Schema({
    triggerID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: trigger_1.default
    },
    response: Object
});
const Journey = mongoose_1.default.model('Journey', journeySchema);
exports.default = Journey;
//# sourceMappingURL=journey.js.map