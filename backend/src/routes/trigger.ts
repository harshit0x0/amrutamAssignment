import express from "express";
import Trigger from "../controllers/triggerControllers";

const TriggerRouter = express.Router();

TriggerRouter.post('/new', Trigger.createTrigger);
TriggerRouter.get('/', Trigger.getTrigger);
TriggerRouter.put('/:id', Trigger.updateTrigger);
TriggerRouter.delete('/:id', Trigger.deleteTrigger);

export default TriggerRouter;
