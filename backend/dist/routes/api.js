"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiControllers_1 = __importDefault(require("../controllers/apiControllers"));
const ApiRouter = express_1.default.Router();
ApiRouter.post('/new', apiControllers_1.default.createApi);
ApiRouter.get('/:id', apiControllers_1.default.getApi);
ApiRouter.put('/:id', apiControllers_1.default.updateApi);
ApiRouter.delete('/:id', apiControllers_1.default.deleteApi);
exports.default = ApiRouter;
//# sourceMappingURL=api.js.map