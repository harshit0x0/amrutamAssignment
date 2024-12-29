import mongoose from 'mongoose';
import Trigger from './trigger';

const journeySchema = new mongoose.Schema({
    name: String,
    triggerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Trigger
    },
    logs: [{
        records:[{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Log'
        }],
        message: String
    }],
    response: Object
})

journeySchema.pre('validate', async function(next) {
    const journey = this;
    const trigger = await Trigger.findOne({_id: journey.triggerID});
    if(!trigger) {
        throw new Error("Trigger not found for this journey");
    }
    next();
});

const Journey = mongoose.model('Journey', journeySchema);
export default Journey;