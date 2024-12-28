import express from "express";
import ApiController from "../controllers/apiControllers";

const ApiRouter = express.Router(); 

// ApiRouter.get("/", (req,res)=>{
//     console.log("API route hit");
//     res.send({
//         message: "API route hit"
//     });
// })


ApiRouter.post('/new', ApiController.createApi);
ApiRouter.get('/:id', ApiController.getApi);
ApiRouter.put('/:id', ApiController.updateApi);
ApiRouter.delete('/:id', ApiController.deleteApi);

export default ApiRouter;
