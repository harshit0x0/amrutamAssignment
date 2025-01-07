import mongoose from 'mongoose';

const apiSchema = new mongoose.Schema({
    url: String,
    method: String,
    headers: [{
        key: String,
        value: String
    }],
    body: String,
    successApiID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'API'
    },
    failureApiID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'API'
    },
    parentApiID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'API'
    },
    pos: {
        x: Number,
        y: Number
    }
})


apiSchema.pre("validate", async function(next){
    const api = this;
    const url = api.url;
    if(/^(http|https):\/\//.test(url) === false) {
        throw new Error("Invalid url, only http, https allowed");
    }
    next();
})

const Api = mongoose.model('API', apiSchema);
export default Api;