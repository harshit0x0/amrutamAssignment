import mongoose from 'mongoose';

const apiSchema = new mongoose.Schema({
    url: String,
    method: String,
    headers: [{
        key: String,
        value: String
    }],
    body: String,
    successApiID: this,
    failureApiID: this,
    parentApiID: this
})


const Api = mongoose.model('API', apiSchema);
export default Api;