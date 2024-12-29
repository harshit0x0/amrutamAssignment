import Api from "../model/api";

async function getPopulatedApi(id : any){
    const populatedApi:any = await Api.findOne({_id: id}).populate('successApiID').populate('failureApiID');
    if(populatedApi.successApiID !== null){
        const SuccessApi = await getPopulatedApi(populatedApi.successApiID);
        populatedApi.successApiID = SuccessApi;
    } 
    if(populatedApi.failureApiID !== null){
        const FailureApi = await getPopulatedApi(populatedApi.failureApiID);
        populatedApi.failureApiID = FailureApi;
    }
    return populatedApi;
}

module.exports.getApi = async function(req: any, res: any){
    try{
        const id = req.params.id;
        const populatedApi = await getPopulatedApi(id);

        if(populatedApi === null) {
            res.status(404).send("Api not found");
            return;
        }
        console.log("Api Found!!");
        res.status(200).send(populatedApi);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.createApi = async function(req: any, res: any) {
    try{
        const ApiData = req.body;
        console.log(ApiData);
        const api = new Api(ApiData);
        await api.save();
        console.log("New Api Created!!");
        res.status(200).send(api);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.updateApi = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const data = req.body;
        const api = await Api.findOne({_id: id});
        if(api === null){
            res.status(404).send("Api not found");
            return;
        }
        
        //if parent api is to be updated
        if(data.parentApiID){
            throw new Error("updating parent api is not allowed");
        }

        //update parent of child apis
        if(data.successApiID || data.failureApiID){
            await Api.findOneAndUpdate({_id: data.successApiID}, {parentApiID: id});
            await Api.findOneAndUpdate({_id: data.failureApiID}, {parentApiID: id});
        }

        const updatedApi = await Api.findOneAndUpdate({_id: id}, data, {new: true});
        console.log("Api Updated!!");
        res.status(200).send(updatedApi);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}


module.exports.deleteApi = async function(req: any, res:any){
    try{
        const id = req.params.id;
        const api = await Api.findOne({_id: id});
        if(api === null) {
            res.status(404).send("Api not found");
            return;
        }

        //update child apis of parent
        if(api.parentApiID !== null){
            const parent = await Api.findOne({_id: api.parentApiID});
            if(parent && parent.successApiID === id){
                await Api.findOneAndUpdate({_id: parent.id}, {successApiID: null});
            }else if(parent && parent.failureApiID === id){
                await Api.findOneAndUpdate({_id: parent.id}, {failureApiID: null});
            }
        }
        
        //update parent of child apis
        if(api.successApiID){
            await Api.findOneAndUpdate({_id: api.successApiID}, {parentApiID: null});
        }
        if(api.failureApiID){
            await Api.findOneAndUpdate({_id: api.failureApiID}, {parentApiID: null});
        }

        const deletedApi = await Api.findOneAndDelete({_id: id}).populate('successApiID').populate('failureApiID');
        console.log("Api Deleted!!");
        res.status(200).send(deletedApi);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

export default module.exports;