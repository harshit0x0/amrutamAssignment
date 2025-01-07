import { v4 as uuid } from 'uuid';
import Trigger from "../model/trigger";


module.exports.getTrigger = async function(req: any, res: any){
    try{
        // const id = req.params.id;
        const trigger = await Trigger.findOne().populate('linkedApiID');
        if(trigger === null){
             res.status(404).send("Trigger not found");
             return;
        }
        console.log("Trigger Found!!");
        res.status(200).send(trigger);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.createTrigger = async function(req: any, res: any) {
    try{
        const triggerData = req.body;
        triggerData.id = uuid();
        const trigger = new Trigger(triggerData);
        await trigger.save();
        console.log("New Trigger Created!!");
        res.status(200).send(trigger);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

module.exports.updateTrigger = async function(req: any, res: any) {
    try{
        const id = req.params.id;
        const data = req.body;
        const trigger = await Trigger.findOneAndUpdate({_id: id}, data, {new: true});
        if(trigger === null){
             res.status(404).send("Trigger not found");
             return;
        }
        console.log("Trigger Updated!!");
        res.status(200).send(trigger);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}


module.exports.deleteTrigger = async function(req: any, res:any){
    try{
        const id = req.params.id;
        const trigger = await Trigger.findOneAndDelete({_id: id});
        if(trigger === null) res.status(404).send("Trigger not found");
        console.log("Trigger Deleted!!");
        res.status(200).send(trigger);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
}

export default module.exports;