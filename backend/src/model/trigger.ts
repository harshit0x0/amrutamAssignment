import mongoose from 'mongoose';
import Api from "./api";

const triggerSchema = new mongoose.Schema({
    webhook: {
        url: String,
        samplePayload: Object,
    },
    webhookType: {
        typeId: String,
        payloadValue: String,
    },
    linkedApiID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Api
    }
})


const Trigger = mongoose.model('Trigger', triggerSchema);
export default Trigger;