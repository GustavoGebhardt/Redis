import { request, response, Router } from "express"
import { store, remove, show, update } from "../controllers/userController"

// import authMiddleware from "../middlewares/auth.js";
// import authAdminMiddleware from "../middlewares/authAdmin.js";
// import error from "../middlewares/errorRoutes.js";

const routes = Router()

routes.post("/user", store);

//routes.use(authMiddleware);

routes.get("/user", show);
routes.put("/user", update);
routes.delete("/user", remove);

//routes.use(error);

export default routes;