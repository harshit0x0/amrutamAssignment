import express from 'express';
import Journey from '../controllers/journeyControllers';

const JourneyRouter = express.Router();
JourneyRouter.get('/', Journey.getJourney);
JourneyRouter.post('/', Journey.createJourney);
JourneyRouter.patch('/:id', Journey.updateJourney);
JourneyRouter.post('/:id/start', Journey.startWorkflow);
JourneyRouter.get('/:id/logs', Journey.getLogs);
JourneyRouter.get('/apis', Journey.findAllApis);

export default JourneyRouter;