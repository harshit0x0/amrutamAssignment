import Journey from "../model/journey";
import Api from "../model/api";
import Log from "../model/logs";


async function initiateAPIflow(api: any, journey_id: string) {
    
    const logs = [];

    while(true){      
        console.log("api hit: ", api.url);
        const apiHeaders = api.headers.map((header: any) => `${header.key}: ${header.value}`);
        const headerObj = {...apiHeaders};
        let response;
        try{
            response = await fetch(api.url, {
                method: api.method,
                headers: headerObj,
                body: api.method === "GET" ? null : api.body,
            });
        }catch(e){
            const log = new Log({
                log: {
                    url: api.url, 
                    payload: api.body, 
                    status: "500", 
                    response: null, 
                    apiID: api._id, 
                    message: "Failure", 
                    timeStamp: new Date()
                }}); 
            await log.save();
            logs.push(log);
            if(api.failureApiID != null) {
                api = await Api.findOne({_id: api.failureApiID});
            }else {
                break;
            }
        }
        // console.log("response: ", response);
        if(response.ok) {
            // const jsonResponse = await response.json();
            const log = new Log({
                log: {
                    url: api.url, 
                    payload: api.body, 
                    status: "200", 
                    response: response, 
                    apiID: api._id, 
                    message: "Success", 
                    timeStamp: new Date()
                }}); 
            await log.save();
            logs.push(log);
            if(api.successApiID != null) {
                api = await Api.findOne({_id: api.successApiID});
            }else {
               break;
            }
        }
        else {
            const log = new Log({
                log: {
                    url: api.url, 
                    payload: api.body, 
                    status: response.status, 
                    response: null, 
                    apiID: api._id, 
                    message: "Failure", 
                    timeStamp: new Date()
                }}); 
            await log.save();
            logs.push(log);
            if(api.failureApiID != null) {
                api = await Api.findOne({_id: api.failureApiID});
            }else {
                break;
            }
        }
    }
    const currJourney = await Journey.findOne({_id: journey_id});
    currJourney.logs.push({
        records: logs, 
        message: "Success"
    });
    await currJourney.save();
}  

module.exports.getJourney = async function(req: any, res: any){
    try{
        // const id = req.params.id;
        const journey = await Journey.findOne();
        if(journey === null) {
            res.status(404).send("Journey not found");
            return;
        }
        console.log("Journey Found!!");
        res.status(200).send(journey);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.createJourney = async function(req: any, res: any) {
    try{
        const journeyData = req.body;
        const journey = new Journey(journeyData);
        await journey.save({ validateBeforeSave: true });
        console.log("New Journey Created!!");
        res.status(200).send(journey);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.updateJourney = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const data = req.body;
        const journey = await Journey.findOneAndUpdate({_id: id}, data, {new: true});
        if(journey === null) {
            res.status(404).send("Journey not found");
            return;
        }
        console.log("Journey Updated!!");
        res.status(200).send(journey);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.startWorkflow = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const journey:any = await Journey.findOne({_id: id}).populate({
            path: "triggerID",
            populate: {
                path: "linkedApiID"
            }
        });
        
        if(journey === null) {
            res.status(404).send("Journey not found");
            return;
        }
        if(journey.triggerID === null) {
            res.status(400).send("Trigger not found for this journey");
            return;
        }
        const api = journey.triggerID.linkedApiID ?? null;
        if(api === null){
            res.status(400).send("Api not found for the trigger associated with this journey");
            return;
        }

        console.log("Workflow started!!");
        await initiateAPIflow(api, journey._id);
        console.log("Workflow ended!!");
        res.status(200).send("Workflow ended");

    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.getLogs = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const journey = await Journey.findOne({_id: id}).populate({
            path: "logs",
            populate: {
                path: "records"
            }
        });
        if(journey === null) {
            res.status(404).send("Journey not found");
            return;
        }
        
        if(journey.logs === null || journey.logs.length === 0) {
            res.status(404).send("Logs not found");
            return;
        }
        console.log("Logs Found!!");
        res.status(200).send(journey.logs);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}


module.exports.findAllApis = async function(req: any, res: any) {
    try{
        const apis = await Api.find();
        if(apis === null) {
            res.status(404).send("Apis not found");
            return;
        }
        console.log("Apis Found!!");
        res.status(200).send(apis);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

export default module.exports;