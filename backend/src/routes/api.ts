import express from "express";
import ApiController from "../controllers/apiControllers";

const ApiRouter = express.Router(); 

ApiRouter.get('/:id', ApiController.getApi);
ApiRouter.post('/', ApiController.createApi);
ApiRouter.patch('/:id', ApiController.updateApi);
ApiRouter.delete('/:id', ApiController.deleteApi);

export default ApiRouter;
