import mongoose from 'mongoose';
import Trigger from './trigger';

const journeySchema = new mongoose.Schema({
    triggerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Trigger
    },
    response: Object
})


const Journey = mongoose.model('Journey', journeySchema);
export default Journey;