import express from "express";
import ApiController from "../controllers/apiControllers";

const ApiRouter = express.Router(); 

ApiRouter.post('/new', ApiController.createApi);
ApiRouter.get('/:id', ApiController.getApi);
ApiRouter.put('/:id', ApiController.updateApi);
ApiRouter.delete('/:id', ApiController.deleteApi);

export default ApiRouter;
