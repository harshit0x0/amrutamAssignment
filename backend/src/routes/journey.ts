import express from 'express';
import Journey from '../model/journey';


const JourneyRouter = express.Router();

JourneyRouter.post('/new', async(req, res) => {
    try{
        const journeyData = req.body;
        const journey = new Journey(journeyData);
        await journey.save();
        console.log("New Journey Created!!");
        res.status(200).send(journey);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})


export default JourneyRouter;