"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./api"));
const triggerSchema = new mongoose_1.default.Schema({
    webhook: {
        url: String,
        samplePayload: Object,
    },
    webhookType: {
        typeId: String,
        payloadValue: String,
    },
    linkedApiID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: api_1.default
    }
});
const Trigger = mongoose_1.default.model('Trigger', triggerSchema);
exports.default = Trigger;
//# sourceMappingURL=trigger.js.map