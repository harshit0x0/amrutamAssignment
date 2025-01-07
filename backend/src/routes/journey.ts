import express from 'express';
import Journey from '../controllers/journeyControllers';

const JourneyRouter = express.Router();
JourneyRouter.post('/new', Journey.createJourney);
JourneyRouter.get('/', Journey.getJourney);
JourneyRouter.put('/:id', Journey.updateJourney);
JourneyRouter.post('/:id/start', Journey.startWorkflow);
JourneyRouter.get('/:id/logs', Journey.getLogs);
JourneyRouter.get('/apis', Journey.findAllApis);

export default JourneyRouter;