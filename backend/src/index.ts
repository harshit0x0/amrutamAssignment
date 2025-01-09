import express from "express";
import { testDB } from "./server";
import TriggerRouter from "./routes/trigger";
import JourneyRouter from "./routes/journey";
import ApiRouter from "./routes/api";
import cors from "cors";

async function main(){
    
    console.clear();
    await testDB(); 
    const app = express();
    app.use(express.json());
    app.use(cors());

    //enable delete and patch requests
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Methods", "DELETE, PATCH");
        next();
    })

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        next();
    })

    try{
        app.listen(8080, () => console.log("Server is running on port 8080\n\n"));
    }catch(e){
        console.log("\n\nSERVER NOT STARTED!! ", e);
    }
    
    app.use('/triggers', TriggerRouter);
    app.use('/journeys', JourneyRouter);
    app.use('/apis', ApiRouter);

 
}
try{
    main();
}catch(e){
    console.log(e);
}



