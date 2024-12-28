import express from "express";
import { testDB } from "./server";
import TriggerRouter from "./routes/trigger";
import JourneyRouter from "./routes/journey";
import ApiRouter from "./routes/api";

async function main(){
    
    console.clear();
    await testDB(); 
    const app = express();
    app.use(express.json());
    
    try{
        app.listen(3000, () => console.log("Server is running on port 3000\n\n"));
    }catch(e){
        console.log("\n\nSERVER NOT STARTED!! ", e);
    }
    
    app.use('/trigger', TriggerRouter);
    app.use('/journey', JourneyRouter);
    app.use('/api', ApiRouter);


}
try{
    main();
}catch(e){
    console.log(e);
}



