"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../model/api"));
module.exports.getApi = async function (req, res) {
    try {
        const id = req.params.id;
        const api = await api_1.default.findOne({ _id: id }).populate('successApiID').populate('failureApiID');
        ;
        if (api === null)
            res.status(404).send("Api not found");
        console.log("Api Found!!");
        res.status(200).send(api);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
module.exports.createApi = async function (req, res) {
    try {
        const ApiData = req.body;
        console.log(ApiData);
        const api = new api_1.default(ApiData);
        await api.save();
        console.log("New Api Created!!");
        res.status(200).send(api);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
module.exports.updateApi = async function (req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const api = await api_1.default.findOne({ _id: id });
        if (api === null)
            res.status(404).send("Api not found");
        if (data.parentApiID) {
            throw new Error("updating parent api is not allowed");
        }
        if (data.successApiID || data.failureApiID) {
            await api_1.default.findOneAndUpdate({ _id: data.successApiID }, { parentApiID: id });
            await api_1.default.findOneAndUpdate({ _id: data.failureApiID }, { parentApiID: id });
        }
        const updatedApi = await api_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
        console.log("Api Updated!!");
        res.status(200).send(updatedApi);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
module.exports.deleteApi = async function (req, res) {
    try {
        const id = req.params.id;
        const api = await api_1.default.findOne({ _id: id });
        if (api === null)
            res.status(404).send("Api not found");
        if (api.parentApiID !== null) {
            const parent = await api_1.default.findOne({ _id: api.parentApiID });
            if (parent && parent.successApiID === id) {
                await api_1.default.findOneAndUpdate({ _id: parent.id }, { successApiID: null });
            }
            else if (parent && parent.failureApiID === id) {
                await api_1.default.findOneAndUpdate({ _id: parent.id }, { failureApiID: null });
            }
        }
        if (api.successApiID) {
            await api_1.default.findOneAndUpdate({ _id: api.successApiID }, { parentApiID: null });
        }
        if (api.failureApiID) {
            await api_1.default.findOneAndUpdate({ _id: api.failureApiID }, { parentApiID: null });
        }
        const deletedApi = await api_1.default.findOneAndDelete({ _id: id }).populate('successApiID').populate('failureApiID');
        console.log("Api Deleted!!");
        res.status(200).send(deletedApi);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};
exports.default = module.exports;
//# sourceMappingURL=apiControllers.js.map