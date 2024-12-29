import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    log: {
        url: String,
        payload: String,
        status: String,
        response: Object,
        apiID: String,
        message: String,
        timeStamp: Date,
    }
});

const Log = mongoose.model("Log", logSchema);
export default Log;