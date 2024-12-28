"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const triggerControllers_1 = __importDefault(require("../controllers/triggerControllers"));
const TriggerRouter = express_1.default.Router();
TriggerRouter.post('/new', triggerControllers_1.default.createTrigger);
TriggerRouter.get('/:id', triggerControllers_1.default.getTrigger);
TriggerRouter.put('/:id', triggerControllers_1.default.updateTrigger);
TriggerRouter.delete('/:id', triggerControllers_1.default.deleteTrigger);
exports.default = TriggerRouter;
//# sourceMappingURL=trigger.js.map