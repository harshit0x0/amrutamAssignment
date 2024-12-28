import Api from "../model/api";

module.exports.getApi = async function(req: any, res: any){
    try{
        const id = req.params.id;
        const api = await Api.findOne({_id: id}).populate('successApiID').populate('failureApiID');;
        if(api === null) res.status(404).send("Api not found");
        console.log("Api Found!!");
        res.status(200).send(api);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
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
        console.log(e);
        res.status(400).send(e);
    }
}

module.exports.updateApi = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const data = req.body;
        const api = await Api.findOne({_id: id});
        if(api === null) res.status(404).send("Api not found");
        
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
        console.log(e);
        res.status(400).send(e);
    }
}


module.exports.deleteApi = async function(req: any, res:any){
    try{
        const id = req.params.id;
        const api = await Api.findOne({_id: id});
        if(api === null) res.status(404).send("Api not found");

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
        console.log(e);
        res.status(400).send(e);
    }
}

export default module.exports;