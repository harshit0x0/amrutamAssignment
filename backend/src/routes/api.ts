import express from "express";
import Api from "../model/api";

const ApiRouter = express.Router(); 

// ApiRouter.get("/", (req,res)=>{
//     console.log("API route hit");
//     res.send({
//         message: "API route hit"
//     });
// })


ApiRouter.post('/new', async(req, res) => {
    try{
        const apiData = req.body;
        // console.log(apiData);
        const api = new Api(apiData);
        await api.save();
        console.log("New API Created!!");
        res.status(200).send(api);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }
})

export default ApiRouter;
