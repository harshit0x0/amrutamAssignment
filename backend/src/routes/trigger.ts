import express from "express";
import Trigger from "../controllers/triggerControllers";

const TriggerRouter = express.Router();

TriggerRouter.get('/', Trigger.getTrigger);
TriggerRouter.post('/', Trigger.createTrigger);
TriggerRouter.patch('/:id', Trigger.updateTrigger);
TriggerRouter.delete('/:id', Trigger.deleteTrigger);

export default TriggerRouter;
