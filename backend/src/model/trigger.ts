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

triggerSchema.pre('validate', async function(next) {
    const trigger = this;
    const webhookURL = trigger.webhook.url;
    if((/^(http|https):\/\//.test(webhookURL)) === false) {
        throw new Error("Invalid webhook url, only http, https allowed");
    }
    next();
})

const Trigger = mongoose.model('Trigger', triggerSchema);
export default Trigger;