import express from "express";
import Trigger from "../model/trigger";
import { v4 as uuid } from 'uuid';

const TriggerRouter = express.Router();

TriggerRouter.post('/new', async(req, res) => {
    try{
        const triggerData = req.body;
        triggerData.id = uuid();
        const trigger = new Trigger(triggerData);
        await trigger.save();
        console.log("New Trigger Created!!");
        res.status(200).send(trigger);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});

// TriggerRouter.get("/", (req,res)=>{
//     console.log("Trigger route hit");
//     res.send({
//         message: "Trigger route hit"
//     });
// })

export default TriggerRouter;
