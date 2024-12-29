import express from 'express';
import Journey from '../controllers/journeyControllers';

const JourneyRouter = express.Router();
JourneyRouter.post('/new', Journey.createJourney);
JourneyRouter.get('/:id', Journey.getJourney);
JourneyRouter.post('/:id/start', Journey.startWorkflow);
JourneyRouter.get('/:id/logs', Journey.getLogs);

export default JourneyRouter;