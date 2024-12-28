import mongoose from 'mongoose';

const apiSchema = new mongoose.Schema({
    url: String,
    method: String,
    headers: [{
        key: String,
        value: String
    }],
    body: String,
    response: {
        status: Number,
        body: String,
    },
    successApiID: this,
    failureApiID: this
})


const Api = mongoose.model('API', apiSchema);
export default Api;