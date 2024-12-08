import { Router } from "express"
import { store, session, remove } from "../controllers/userController"

import authMiddleware from "../middlewares/auth.js";
import errorMiddleware from "../middlewares/error";

const routes = Router()

routes.post("/user", store)
routes.post("/session", session)

routes.use(authMiddleware)

routes.delete("/user", remove)

routes.use(errorMiddleware)

export default routes