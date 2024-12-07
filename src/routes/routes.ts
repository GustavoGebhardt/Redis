import { Router } from "express"
import { store, session, remove } from "../controllers/userController"

// import authMiddleware from "../middlewares/auth.js";
// import authAdminMiddleware from "../middlewares/authAdmin.js";
// import error from "../middlewares/errorRoutes.js";

const routes = Router()

routes.post("/user", store)
routes.post("/session", session)

//routes.use(authMiddleware)

routes.get("/user", remove)

//routes.use(error)

export default routes